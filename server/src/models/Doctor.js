const mongoose = require('mongoose');
const { DoctorStatus } = require('../shared');

const DoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true, index: true },
  roomNumber: { type: String, required: true },
  maxDailyTokens: { type: Number, default: 50 },
  status: { 
    type: String, 
    enum: Object.values(DoctorStatus), 
    default: DoctorStatus.OFF_DUTY, 
    index: true 
  },
  currentTokenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' },
  shift: {
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '17:00' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
