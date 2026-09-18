const IQueueStrategy = require('../interfaces/IQueueStrategy');
const { QUEUE_WEIGHTS } = require('../config/constants');

class VipQueueStrategy extends IQueueStrategy {
  calculatePriority({ waitTimeMins = 0 }) {
    return QUEUE_WEIGHTS.VIP + Math.floor(waitTimeMins * QUEUE_WEIGHTS.WAIT_TIME_MULTIPLIER);
  }
}

module.exports = VipQueueStrategy;
