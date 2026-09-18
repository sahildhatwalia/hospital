/**
 * Interface contract for Queue entity persistence operations.
 */
class IQueueRepository {
  async findOrCreateTodayQueue(departmentId, doctorId, dateStr) {
    throw new Error('Method not implemented');
  }
  async getQueueById(queueId) {
    throw new Error('Method not implemented');
  }
  async updateQueueCounts(queueId, activeDelta, completedDelta) {
    throw new Error('Method not implemented');
  }
}

module.exports = IQueueRepository;
