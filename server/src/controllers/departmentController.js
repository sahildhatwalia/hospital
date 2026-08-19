const Department = require('../models/Department');
const { CreateDepartmentSchema } = require('../shared');

async function getDepartments(req, res, next) {
  try {
    const departments = await Department.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: departments });
  } catch (error) {
    next(error);
  }
}

async function createDepartment(req, res, next) {
  try {
    const validatedData = CreateDepartmentSchema.parse(req.body);
    const department = await Department.create(validatedData);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    next(error);
  }
}

module.exports = {
  getDepartments,
  createDepartment
};
