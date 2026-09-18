const INotificationSender = require('../interfaces/INotificationSender');
const logger = require('../utils/logger');

class SMSNotificationSender extends INotificationSender {
  async send(recipient, message, meta = {}) {
    // Integration point for Twilio / SMS provider
    logger.info({ recipient, message, meta }, '[SMS Notification Sent]');
    return { success: true, channel: 'SMS', recipient, message };
  }
}

module.exports = SMSNotificationSender;
