const IQueueStrategy = require('../interfaces/IQueueStrategy');
const { QUEUE_WEIGHTS } = require('../config/constants');

class NormalQueueStrategy extends IQueueStrategy {
  calculatePriority({ age = 30, waitTimeMins = 0 }) {
    let score = QUEUE_WEIGHTS.WALK_IN;
    if (waitTimeMins > 0) {
      score += Math.floor(waitTimeMins * QUEUE_WEIGHTS.WAIT_TIME_MULTIPLIER);
    }
    if (age >= 65 || age <= 5) {
      score += QUEUE_WEIGHTS.AGE_BONUS;
    }
    return score;
  }
}

module.exports = NormalQueueStrategy;
