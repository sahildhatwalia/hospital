const INotificationSender = require('../interfaces/INotificationSender');
const logger = require('../utils/logger');

class WebSocketNotificationSender extends INotificationSender {
  constructor(getIo) {
    super();
    this.getIo = getIo;
  }

  async send(room, payload, meta = {}) {
    const io = typeof this.getIo === 'function' ? this.getIo() : this.getIo;
    const eventName = meta.event || 'queue:updated';
    if (io) {
      io.to(room).emit(eventName, payload);
      logger.info({ room, eventName, payload }, '[WebSocket Notification Broadcasted]');
      return { success: true, channel: 'WEBSOCKET', room, eventName };
    }
    logger.warn({ room, eventName }, '[WebSocket Notification Skipped - Socket server unavailable]');
    return { success: false, channel: 'WEBSOCKET', room };
  }
}

module.exports = WebSocketNotificationSender;
