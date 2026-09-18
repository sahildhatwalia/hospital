/**
 * Strategy interface contract for queue priority calculations.
 * Open/Closed Principle: New priority types inherit/implement this interface.
 */
class IQueueStrategy {
  /**
   * @param {Object} params - { tokenType, age, waitTimeMins, isEmergency }
   * @returns {number} Priority score
   */
  calculatePriority(params) {
    throw new Error('Method calculatePriority() must be implemented');
  }
}

module.exports = IQueueStrategy;
