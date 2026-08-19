const mongoose = require('mongoose');
const { NotificationChannel, NotificationType } = require('../shared');

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tokenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  channel: { 
    type: String, 
    enum: Object.values(NotificationChannel), 
    default: NotificationChannel.SMS 
  },
  type: { 
    type: String, 
    enum: Object.values(NotificationType), 
    required: true 
  },
  message: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' },
  sentAt: { type: Date },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
