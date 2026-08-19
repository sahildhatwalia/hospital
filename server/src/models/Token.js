const mongoose = require('mongoose');
const { TokenType, TokenStatus } = require('../shared');

const TokenSchema = new mongoose.Schema({
  tokenCode: { type: String, required: true, index: true }, // e.g. "CARD-014"
  displaySequence: { type: Number, required: true },
  queueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue', required: true, index: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  tokenType: { 
    type: String, 
    enum: Object.values(TokenType), 
    default: TokenType.WALK_IN 
  },
  status: { 
    type: String, 
    enum: Object.values(TokenStatus), 
    default: TokenStatus.WAITING, 
    index: true 
  },
  priorityScore: { type: Number, default: 10, index: true },
  estimatedWaitTimeMinutes: { type: Number, default: 0 },
  checkedInAt: { type: Date, default: Date.now },
  calledAt: { type: Date },
  completedAt: { type: Date }
}, { timestamps: true });

// Index for efficiently fetching tokens in priority and sequence order
TokenSchema.index({ queueId: 1, status: 1, priorityScore: -1, displaySequence: 1 });

module.exports = mongoose.model('Token', TokenSchema);
