const IQueueStrategy = require('../interfaces/IQueueStrategy');
const { QUEUE_WEIGHTS } = require('../config/constants');

class EmergencyQueueStrategy extends IQueueStrategy {
  calculatePriority({ waitTimeMins = 0 }) {
    // Emergency gets immediate top priority + wait time adjustment
    return QUEUE_WEIGHTS.EMERGENCY + Math.floor(waitTimeMins * QUEUE_WEIGHTS.WAIT_TIME_MULTIPLIER);
  }
}

module.exports = EmergencyQueueStrategy;
