const IQueueRepository = require('../interfaces/IQueueRepository');
const Queue = require('../models/Queue');

class MongooseQueueRepository extends IQueueRepository {
  async findOrCreateTodayQueue(departmentId, doctorId = null, dateStr) {
    return await Queue.findOneAndUpdate(
      { departmentId, date: dateStr, doctorId: doctorId || null },
      {
        $inc: { lastTokenNumber: 1, activeTokensCount: 1 },
        $setOnInsert: { status: 'ACTIVE', completedTokensCount: 0 }
      },
      { upsert: true, new: true }
    );
  }

  async getQueueById(queueId) {
    return await Queue.findById(queueId);
  }

  async updateQueueCounts(queueId, activeDelta = 0, completedDelta = 0) {
    const updateObj = {};
    if (activeDelta !== 0) updateObj.activeTokensCount = activeDelta;
    if (completedDelta !== 0) updateObj.completedTokensCount = completedDelta;

    return await Queue.findByIdAndUpdate(
      queueId,
      { $inc: updateObj },
      { new: true }
    );
  }
}

module.exports = MongooseQueueRepository;
