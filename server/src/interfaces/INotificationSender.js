/**
 * Interface contract for notification dispatching (SMS, Email, WebSocket).
 */
class INotificationSender {
  /**
   * @param {string} recipient - Target address/phone/room
   * @param {string} message - Notification text/payload
   * @param {Object} [meta] - Additional metadata
   */
  async send(recipient, message, meta = {}) {
    throw new Error('Method send() must be implemented');
  }
}

module.exports = INotificationSender;
