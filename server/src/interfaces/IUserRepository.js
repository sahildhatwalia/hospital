/**
 * Interface contract for User entity persistence operations.
 */
class IUserRepository {
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }
  async findById(userId) {
    throw new Error('Method not implemented');
  }
  async createUser(userData) {
    throw new Error('Method not implemented');
  }
}

module.exports = IUserRepository;
