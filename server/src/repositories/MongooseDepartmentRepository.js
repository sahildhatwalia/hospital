const IDepartmentRepository = require('../interfaces/IDepartmentRepository');
const Department = require('../models/Department');

class MongooseDepartmentRepository extends IDepartmentRepository {
  async findById(deptId) {
    return await Department.findById(deptId);
  }

  async findAll() {
    return await Department.find();
  }

  async findByCode(code) {
    return await Department.findOne({ code: code.toUpperCase() });
  }
}

module.exports = MongooseDepartmentRepository;
