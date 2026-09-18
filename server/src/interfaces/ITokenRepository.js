/**
 * Interface contract for Token entity persistence operations.
 */
class ITokenRepository {
  async createToken(tokenData) {
    throw new Error('Method not implemented');
  }
  async findById(tokenId) {
    throw new Error('Method not implemented');
  }
  async countWaitingAhead(queueId, priorityScore) {
    throw new Error('Method not implemented');
  }
  async fetchNextWaitingToken(departmentId) {
    throw new Error('Method not implemented');
  }
  async updateTokenStatus(tokenId, status, extraFields = {}) {
    throw new Error('Method not implemented');
  }
  async getActiveTokensByDepartment(departmentId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ITokenRepository;
