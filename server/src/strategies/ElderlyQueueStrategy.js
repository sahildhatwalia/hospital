const IQueueStrategy = require('../interfaces/IQueueStrategy');
const { QUEUE_WEIGHTS } = require('../config/constants');

class ElderlyQueueStrategy extends IQueueStrategy {
  calculatePriority({ waitTimeMins = 0 }) {
    return QUEUE_WEIGHTS.ELDERLY + Math.floor(waitTimeMins * QUEUE_WEIGHTS.WAIT_TIME_MULTIPLIER);
  }
}

module.exports = ElderlyQueueStrategy;
