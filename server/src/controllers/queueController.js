const Queue = require('../models/Queue');
const Token = require('../models/Token');
const { TokenStatus } = require('../shared');

async function getLiveQueue(req, res, next) {
  try {
    const { departmentId } = req.params;
    const today = new Date().toISOString().split('T')[0];

    const queue = await Queue.findOne({ departmentId, date: today })
      .populate('departmentId', 'name code avgConsultationTimeMinutes');

    if (!queue) {
      return res.json({
        success: true,
        data: {
          queue: null,
          waitingTokens: [],
          inConsultationTokens: [],
          activeCount: 0
        }
      });
    }

    const waitingTokens = await Token.find({ queueId: queue._id, status: TokenStatus.WAITING })
      .sort({ priorityScore: -1, displaySequence: 1 })
      .populate('patientId', 'name phone');

    const inConsultationTokens = await Token.find({ queueId: queue._id, status: TokenStatus.IN_CONSULTATION })
      .populate('patientId', 'name phone')
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name' }
      });

    res.json({
      success: true,
      data: {
        queue,
        waitingTokens,
        inConsultationTokens,
        activeCount: waitingTokens.length
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLiveQueue
};
