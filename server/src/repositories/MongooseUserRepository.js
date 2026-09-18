const IUserRepository = require('../interfaces/IUserRepository');
const User = require('../models/User');

class MongooseUserRepository extends IUserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async createUser(userData) {
    return await User.create(userData);
  }
}

module.exports = MongooseUserRepository;
