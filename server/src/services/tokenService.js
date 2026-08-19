const mongoose = require('mongoose');
const Queue = require('../models/Queue');
const Token = require('../models/Token');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const { TokenType, TokenStatus, DoctorStatus } = require('../shared');
const { notificationQueue } = require('../workers/notificationWorker');

async function generateToken(params, getIo) {
  const { patientId, departmentId, tokenType = TokenType.WALK_IN, doctorId } = params;
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const dept = await Department.findById(departmentId);
  if (!dept) {
    throw new Error('Department not found');
  }

  // Atomic increment of daily sequence for this department/doctor
  const queue = await Queue.findOneAndUpdate(
    { departmentId, date: today, doctorId: doctorId || null },
    { 
      $inc: { lastTokenNumber: 1, activeTokensCount: 1 },
      $setOnInsert: { status: 'ACTIVE', completedTokensCount: 0 }
    },
    { upsert: true, new: true }
  );

  const sequence = queue.lastTokenNumber;
  const tokenCode = `${dept.code}-${String(sequence).padStart(3, '0')}`;

  let priorityScore = 10;
  if (tokenType === TokenType.EMERGENCY) priorityScore = 100;
  else if (tokenType === TokenType.ELDERLY) priorityScore = 50;
  else if (tokenType === TokenType.APPOINTMENT) priorityScore = 20;

  // Calculate estimated wait time
  const waitingAheadCount = await Token.countDocuments({
    queueId: queue._id,
    status: TokenStatus.WAITING,
    priorityScore: { $gte: priorityScore }
  });

  const estimatedWaitTimeMinutes = waitingAheadCount * (dept.avgConsultationTimeMinutes || 15);

  const newToken = await Token.create({
    tokenCode,
    displaySequence: sequence,
    queueId: queue._id,
    patientId,
    departmentId,
    doctorId: doctorId || null,
    tokenType,
    status: TokenStatus.WAITING,
    priorityScore,
    estimatedWaitTimeMinutes,
    checkedInAt: new Date()
  });

  // Socket broadcast to department/queue room
  const io = getIo();
  if (io) {
    io.to(`queue_${queue._id}`).emit('queue:updated', {
      event: 'TOKEN_GENERATED',
      queueId: queue._id,
      tokenId: newToken._id,
      tokenCode: newToken.tokenCode,
      activeTokensCount: queue.activeTokensCount,
      timestamp: new Date().toISOString()
    });
  }

  // Async notification queue
  if (notificationQueue) {
    try {
      await notificationQueue.add('SEND_TOKEN_CONFIRMATION', {
        patientId,
        tokenCode: newToken.tokenCode,
        estimatedWaitTime: estimatedWaitTimeMinutes
      });
    } catch (e) {
      // Ignored if Redis is offline in dev
    }
  }

  return newToken;
}

async function callNextToken(doctorId, getIo) {
  let doctor = await Doctor.findById(doctorId).populate('userId');
  if (!doctor) {
    doctor = await Doctor.findOne({ userId: doctorId }).populate('userId');
  }
  if (!doctor) throw new Error('Doctor profile not found');

  const today = new Date().toISOString().split('T')[0];

  // Find next waiting token in doctor's department ordered by priorityScore DESC, displaySequence ASC
  const nextToken = await Token.findOneAndUpdate(
    { departmentId: doctor.departmentId, status: TokenStatus.WAITING },
    { 
      status: TokenStatus.IN_CONSULTATION,
      doctorId: doctor._id,
      calledAt: new Date()
    },
    { sort: { priorityScore: -1, displaySequence: 1 }, new: true }
  ).populate('patientId', 'name phone email');

  if (!nextToken) {
    return null; // No tokens waiting
  }

  // Update doctor's current token & status
  doctor.currentTokenId = nextToken._id;
  doctor.status = DoctorStatus.AVAILABLE;
  await doctor.save();

  // Socket broadcast
  const io = getIo();
  if (io) {
    io.to(`queue_${nextToken.queueId}`).emit('queue:updated', {
      event: 'TOKEN_CALLED',
      queueId: nextToken.queueId,
      departmentId: doctor.departmentId,
      tokenId: nextToken._id,
      currentTokenCode: nextToken.tokenCode,
      roomNumber: doctor.roomNumber,
      timestamp: new Date().toISOString()
    });

    // Notify patient room directly
    const patientUserId = nextToken.patientId?._id || nextToken.patientId;
    if (patientUserId) {
      io.to(`patient_${patientUserId}`).emit('token:called', {
        tokenCode: nextToken.tokenCode,
        roomNumber: doctor.roomNumber,
        doctorName: doctor.userId?.name || 'Doctor'
      });
    }
  }

  return nextToken;
}


async function completeToken(tokenId, getIo) {
  const token = await Token.findByIdAndUpdate(
    tokenId,
    { status: TokenStatus.COMPLETED, completedAt: new Date() },
    { new: true }
  );

  if (!token) throw new Error('Token not found');

  // Update Queue counts
  const queue = await Queue.findByIdAndUpdate(token.queueId, {
    $inc: { activeTokensCount: -1, completedTokensCount: 1 }
  }, { new: true });

  // Clear Doctor currentTokenId if assigned
  if (token.doctorId) {
    await Doctor.findByIdAndUpdate(token.doctorId, { currentTokenId: null });
  }

  const io = getIo();
  if (io && queue) {
    io.to(`queue_${queue._id}`).emit('queue:updated', {
      event: 'TOKEN_COMPLETED',
      queueId: queue._id,
      tokenId: token._id,
      tokenCode: token.tokenCode,
      activeTokensCount: queue.activeTokensCount,
      timestamp: new Date().toISOString()
    });
  }

  return token;
}

async function skipToken(tokenId, getIo) {
  const token = await Token.findByIdAndUpdate(
    tokenId,
    { status: TokenStatus.SKIPPED },
    { new: true }
  );

  if (!token) throw new Error('Token not found');

  const queue = await Queue.findByIdAndUpdate(token.queueId, {
    $inc: { activeTokensCount: -1 }
  }, { new: true });

  if (token.doctorId) {
    await Doctor.findByIdAndUpdate(token.doctorId, { currentTokenId: null });
  }

  const io = getIo();
  if (io && queue) {
    io.to(`queue_${queue._id}`).emit('queue:updated', {
      event: 'TOKEN_SKIPPED',
      queueId: queue._id,
      tokenId: token._id,
      tokenCode: token.tokenCode,
      activeTokensCount: queue.activeTokensCount,
      timestamp: new Date().toISOString()
    });
  }

  return token;
}

async function cancelToken(tokenId, patientId, getIo) {
  const token = await Token.findOne({ _id: tokenId, patientId });
  if (!token) throw new Error('Token not found or unauthorized');

  if (token.status === TokenStatus.COMPLETED || token.status === TokenStatus.CANCELLED) {
    throw new Error('Token cannot be cancelled in its current state');
  }

  const wasActive = token.status === TokenStatus.WAITING || token.status === TokenStatus.IN_CONSULTATION;
  token.status = TokenStatus.CANCELLED;
  await token.save();

  let queue = null;
  if (wasActive) {
    queue = await Queue.findByIdAndUpdate(token.queueId, {
      $inc: { activeTokensCount: -1 }
    }, { new: true });
  }

  if (token.doctorId) {
    await Doctor.findByIdAndUpdate(token.doctorId, { currentTokenId: null });
  }

  const io = getIo();
  if (io && token.queueId) {
    io.to(`queue_${token.queueId}`).emit('queue:updated', {
      event: 'TOKEN_CANCELLED',
      queueId: token.queueId,
      tokenId: token._id,
      tokenCode: token.tokenCode,
      activeTokensCount: queue ? queue.activeTokensCount : 0,
      timestamp: new Date().toISOString()
    });
  }

  return token;
}

module.exports = {
  generateToken,
  callNextToken,
  completeToken,
  skipToken,
  cancelToken
};

