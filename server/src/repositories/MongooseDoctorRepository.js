const IDoctorRepository = require('../interfaces/IDoctorRepository');
const Doctor = require('../models/Doctor');

class MongooseDoctorRepository extends IDoctorRepository {
  async findById(doctorId) {
    return await Doctor.findById(doctorId).populate('userId', 'name email role');
  }

  async findByUserId(userId) {
    return await Doctor.findOne({ userId }).populate('userId', 'name email role');
  }

  async updateDoctorStatus(doctorId, status, currentTokenId = null) {
    const updateObj = { status };
    if (currentTokenId !== undefined) {
      updateObj.currentTokenId = currentTokenId;
    }
    return await Doctor.findByIdAndUpdate(doctorId, updateObj, { new: true });
  }

  async findAllActiveDoctors() {
    return await Doctor.find().populate('userId', 'name email role').populate('departmentId', 'name code');
  }
}

module.exports = MongooseDoctorRepository;
