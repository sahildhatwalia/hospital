const mongoose = require('mongoose');
const { AppointmentStatus } = require('../shared');

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  appointmentDate: { type: String, required: true }, // YYYY-MM-DD
  slotTime: { type: String, required: true }, // HH:mm
  status: { 
    type: String, 
    enum: Object.values(AppointmentStatus), 
    default: AppointmentStatus.SCHEDULED 
  },
  tokenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Token' }
}, { timestamps: true });

AppointmentSchema.index({ doctorId: 1, appointmentDate: 1, slotTime: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
