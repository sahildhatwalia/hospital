const { TOKEN_TYPE } = require('../config/constants');
const NormalQueueStrategy = require('../strategies/NormalQueueStrategy');
const EmergencyQueueStrategy = require('../strategies/EmergencyQueueStrategy');
const ElderlyQueueStrategy = require('../strategies/ElderlyQueueStrategy');
const VipQueueStrategy = require('../strategies/VipQueueStrategy');

class QueueStrategyFactory {
  static getStrategy(tokenType) {
    switch (tokenType) {
      case TOKEN_TYPE.EMERGENCY:
        return new EmergencyQueueStrategy();
      case TOKEN_TYPE.ELDERLY:
        return new ElderlyQueueStrategy();
      case TOKEN_TYPE.VIP:
        return new VipQueueStrategy();
      default:
        return new NormalQueueStrategy();
    }
  }
}

module.exports = QueueStrategyFactory;
