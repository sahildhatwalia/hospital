const mongoose = require('mongoose');
const { UserRole } = require('../shared');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.PATIENT, 
    index: true 
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
