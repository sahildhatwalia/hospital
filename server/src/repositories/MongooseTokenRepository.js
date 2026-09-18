const ITokenRepository = require('../interfaces/ITokenRepository');
const Token = require('../models/Token');
const { TOKEN_STATUS } = require('../config/constants');

class MongooseTokenRepository extends ITokenRepository {
  async createToken(tokenData) {
    return await Token.create(tokenData);
  }

  async findById(tokenId) {
    return await Token.findById(tokenId).populate('patientId', 'name phone email age gender');
  }

  async countWaitingAhead(queueId, priorityScore) {
    return await Token.countDocuments({
      queueId,
      status: TOKEN_STATUS.WAITING,
      priorityScore: { $gte: priorityScore }
    });
  }

  async fetchNextWaitingToken(departmentId) {
    return await Token.findOneAndUpdate(
      { departmentId, status: TOKEN_STATUS.WAITING },
      {
        status: TOKEN_STATUS.IN_CONSULTATION,
        calledAt: new Date()
      },
      { sort: { priorityScore: -1, displaySequence: 1 }, new: true }
    ).populate('patientId', 'name phone email age gender');
  }

  async updateTokenStatus(tokenId, status, extraFields = {}) {
    return await Token.findByIdAndUpdate(
      tokenId,
      { status, ...extraFields },
      { new: true }
    );
  }

  async getActiveTokensByDepartment(departmentId) {
    return await Token.find({
      departmentId,
      status: { $in: [TOKEN_STATUS.WAITING, TOKEN_STATUS.IN_CONSULTATION] }
    })
    .sort({ priorityScore: -1, displaySequence: 1 })
    .populate('patientId', 'name age gender');
  }
}

module.exports = MongooseTokenRepository;
