const SMSNotificationSender = require('../senders/SMSNotificationSender');
const EmailNotificationSender = require('../senders/EmailNotificationSender');
const WebSocketNotificationSender = require('../senders/WebSocketNotificationSender');

class NotificationSenderFactory {
  static getSender(type, getIo = null) {
    switch (type.toUpperCase()) {
      case 'SMS':
        return new SMSNotificationSender();
      case 'EMAIL':
        return new EmailNotificationSender();
      case 'WEBSOCKET':
      case 'SOCKET':
        return new WebSocketNotificationSender(getIo);
      default:
        return new WebSocketNotificationSender(getIo);
    }
  }
}

module.exports = NotificationSenderFactory;
