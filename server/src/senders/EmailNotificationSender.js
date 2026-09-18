const INotificationSender = require('../interfaces/INotificationSender');
const logger = require('../utils/logger');

class EmailNotificationSender extends INotificationSender {
  async send(recipient, message, meta = {}) {
    logger.info({ recipient, subject: meta.subject || 'NEXLINE Hospital Notification', message }, '[Email Notification Sent]');
    return { success: true, channel: 'EMAIL', recipient, message };
  }
}

module.exports = EmailNotificationSender;
