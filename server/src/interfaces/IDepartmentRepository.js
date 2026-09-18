/**
 * Interface contract for Department entity persistence operations.
 */
class IDepartmentRepository {
  async findById(deptId) {
    throw new Error('Method not implemented');
  }
  async findAll() {
    throw new Error('Method not implemented');
  }
  async findByCode(code) {
    throw new Error('Method not implemented');
  }
}

module.exports = IDepartmentRepository;
