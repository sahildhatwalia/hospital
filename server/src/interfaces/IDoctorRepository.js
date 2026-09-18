/**
 * Interface contract for Doctor entity persistence operations.
 */
class IDoctorRepository {
  async findById(doctorId) {
    throw new Error('Method not implemented');
  }
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }
  async updateDoctorStatus(doctorId, status, currentTokenId = null) {
    throw new Error('Method not implemented');
  }
  async findAllActiveDoctors() {
    throw new Error('Method not implemented');
  }
}

module.exports = IDoctorRepository;
