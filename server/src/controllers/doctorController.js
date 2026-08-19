const Doctor = require('../models/Doctor');
const { CreateDoctorSchema, UpdateDoctorStatusSchema } = require('../shared');

async function getDoctors(req, res, next) {
  try {
    const { departmentId } = req.query;
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;

    const doctors = await Doctor.find(filter)
      .populate('userId', 'name email phone')
      .populate('departmentId', 'name code')
      .populate('currentTokenId');

    res.json({ success: true, data: doctors });
  } catch (error) {
    next(error);
  }
}

async function createDoctor(req, res, next) {
  try {
    const validatedData = CreateDoctorSchema.parse(req.body);
    const doctor = await Doctor.create(validatedData);
    const populated = await Doctor.findById(doctor._id)
      .populate('userId', 'name email phone')
      .populate('departmentId', 'name code');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    next(error);
  }
}

async function updateDoctorStatus(req, res, next) {
  try {
    const { id } = req.params;
    const validatedData = UpdateDoctorStatusSchema.parse(req.body);

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { status: validatedData.status },
      { new: true }
    ).populate('userId', 'name').populate('departmentId', 'name');

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    next(error);
  }
}

async function getDoctorMe(req, res, next) {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id })
      .populate('userId', 'name email phone')
      .populate('departmentId', 'name code')
      .populate('currentTokenId');

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found for user' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctorStatus,
  getDoctorMe
};

