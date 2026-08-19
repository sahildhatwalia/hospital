const mongoose = require('mongoose');
const { QueueStatus } = require('../shared');

const QueueSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  date: { type: String, required: true }, // Formatted YYYY-MM-DD
  status: { 
    type: String, 
    enum: Object.values(QueueStatus), 
    default: QueueStatus.ACTIVE 
  },
  lastTokenNumber: { type: Number, default: 0 },
  activeTokensCount: { type: Number, default: 0 },
  completedTokensCount: { type: Number, default: 0 }
}, { timestamps: true });

// Compound index to ensure uniqueness per department & doctor per date
QueueSchema.index({ departmentId: 1, date: 1, doctorId: 1 }, { unique: true });

module.exports = mongoose.model('Queue', QueueSchema);
