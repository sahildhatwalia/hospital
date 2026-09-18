const { TOKEN_STATUS, TokenType, DEPT_PREFIXES } = require('../config/constants');
const AppError = require('../utils/AppError');
const QueueStrategyFactory = require('../factories/QueueStrategyFactory');
const MongooseTokenRepository = require('../repositories/MongooseTokenRepository');
const MongooseQueueRepository = require('../repositories/MongooseQueueRepository');
const MongooseDepartmentRepository = require('../repositories/MongooseDepartmentRepository');
const MongooseDoctorRepository = require('../repositories/MongooseDoctorRepository');
const WebSocketNotificationSender = require('../senders/WebSocketNotificationSender');

class TokenService {
  constructor({
    tokenRepo = new MongooseTokenRepository(),
    queueRepo = new MongooseQueueRepository(),
    departmentRepo = new MongooseDepartmentRepository(),
    doctorRepo = new MongooseDoctorRepository(),
  } = {}) {
    this.tokenRepo = tokenRepo;
    this.queueRepo = queueRepo;
    this.departmentRepo = departmentRepo;
    this.doctorRepo = doctorRepo;
  }

  async generateToken(params, getIo) {
    const { patientId, departmentId, tokenType = 'WALK_IN', doctorId, age = 30 } = params;
    const today = new Date().toISOString().split('T')[0];

    const dept = await this.departmentRepo.findById(departmentId);
    if (!dept) {
      throw new AppError('Department not found', 404);
    }

    const queue = await this.queueRepo.findOrCreateTodayQueue(departmentId, doctorId, today);
    const sequence = queue.lastTokenNumber;
    const deptPrefix = dept.code || DEPT_PREFIXES[dept.name?.toUpperCase()] || 'OPD';
    const tokenCode = `${deptPrefix}-${String(sequence).padStart(3, '0')}`;

    // Priority scoring strategy pattern
    const strategy = QueueStrategyFactory.getStrategy(tokenType);
    const priorityScore = strategy.calculatePriority({ tokenType, age, waitTimeMins: 0 });

    const waitingAheadCount = await this.tokenRepo.countWaitingAhead(queue._id, priorityScore);
    const estimatedWaitTimeMinutes = waitingAheadCount * (dept.avgConsultationTimeMinutes || 15);

    const newToken = await this.tokenRepo.createToken({
      tokenCode,
      displaySequence: sequence,
      queueId: queue._id,
      patientId,
      departmentId,
      doctorId: doctorId || null,
      tokenType,
      status: TOKEN_STATUS.WAITING,
      priorityScore,
      estimatedWaitTimeMinutes,
      checkedInAt: new Date(),
    });

    const wsSender = new WebSocketNotificationSender(getIo);
    await wsSender.send(`queue_${queue._id}`, {
      event: 'TOKEN_GENERATED',
      queueId: queue._id,
      tokenId: newToken._id,
      tokenCode: newToken.tokenCode,
      activeTokensCount: queue.activeTokensCount,
      timestamp: new Date().toISOString(),
    });

    return newToken;
  }

  async callNextToken(doctorId, getIo) {
    let doctor = await this.doctorRepo.findById(doctorId);
    if (!doctor) {
      doctor = await this.doctorRepo.findByUserId(doctorId);
    }
    if (!doctor) throw new AppError('Doctor profile not found', 404);

    const nextToken = await this.tokenRepo.fetchNextWaitingToken(doctor.departmentId);
    if (!nextToken) return null;

    await this.doctorRepo.updateDoctorStatus(doctor._id, 'AVAILABLE', nextToken._id);

    const wsSender = new WebSocketNotificationSender(getIo);
    await wsSender.send(`queue_${nextToken.queueId}`, {
      event: 'TOKEN_CALLED',
      queueId: nextToken.queueId,
      departmentId: doctor.departmentId,
      tokenId: nextToken._id,
      currentTokenCode: nextToken.tokenCode,
      roomNumber: doctor.roomNumber,
      timestamp: new Date().toISOString(),
    });

    const patientUserId = nextToken.patientId?._id || nextToken.patientId;
    if (patientUserId) {
      await wsSender.send(`patient_${patientUserId}`, {
        tokenCode: nextToken.tokenCode,
        roomNumber: doctor.roomNumber,
        doctorName: doctor.userId?.name || 'Doctor',
      }, { event: 'token:called' });
    }

    return nextToken;
  }

  async completeToken(tokenId, getIo) {
    const token = await this.tokenRepo.updateTokenStatus(tokenId, TOKEN_STATUS.COMPLETED, { completedAt: new Date() });
    if (!token) throw new AppError('Token not found', 404);

    const queue = await this.queueRepo.updateQueueCounts(token.queueId, -1, 1);
    if (token.doctorId) {
      await this.doctorRepo.updateDoctorStatus(token.doctorId, 'AVAILABLE', null);
    }

    const wsSender = new WebSocketNotificationSender(getIo);
    if (queue) {
      await wsSender.send(`queue_${queue._id}`, {
        event: 'TOKEN_COMPLETED',
        queueId: queue._id,
        tokenId: token._id,
        tokenCode: token.tokenCode,
        activeTokensCount: queue.activeTokensCount,
        timestamp: new Date().toISOString(),
      });
    }

    return token;
  }

  async skipToken(tokenId, getIo) {
    const token = await this.tokenRepo.updateTokenStatus(tokenId, TOKEN_STATUS.SKIPPED);
    if (!token) throw new AppError('Token not found', 404);

    const queue = await this.queueRepo.updateQueueCounts(token.queueId, -1, 0);
    if (token.doctorId) {
      await this.doctorRepo.updateDoctorStatus(token.doctorId, 'AVAILABLE', null);
    }

    const wsSender = new WebSocketNotificationSender(getIo);
    if (queue) {
      await wsSender.send(`queue_${queue._id}`, {
        event: 'TOKEN_SKIPPED',
        queueId: queue._id,
        tokenId: token._id,
        tokenCode: token.tokenCode,
        activeTokensCount: queue.activeTokensCount,
        timestamp: new Date().toISOString(),
      });
    }

    return token;
  }

  async emergencyBumpToken(tokenId, getIo) {
    const token = await this.tokenRepo.findById(tokenId);
    if (!token) throw new AppError('Token not found', 404);

    // Bump priority score to Emergency level (200+)
    const updatedToken = await this.tokenRepo.updateTokenStatus(tokenId, TOKEN_STATUS.WAITING, {
      priorityScore: 250,
      tokenType: 'EMERGENCY',
    });

    const wsSender = new WebSocketNotificationSender(getIo);
    await wsSender.send(`queue_${token.queueId}`, {
      event: 'TOKEN_EMERGENCY_BUMPED',
      queueId: token.queueId,
      tokenId: token._id,
      tokenCode: token.tokenCode,
      priorityScore: 250,
      timestamp: new Date().toISOString(),
    });

    return updatedToken;
  }
}

module.exports = TokenService;
