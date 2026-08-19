const tokenService = require('../services/tokenService');
const Token = require('../models/Token');
const { GenerateTokenSchema } = require('../shared');

async function createToken(req, res, next) {
  try {
    const validatedData = GenerateTokenSchema.parse(req.body);
    const patientId = validatedData.patientId || req.user._id;

    const token = await tokenService.generateToken({
      patientId,
      departmentId: validatedData.departmentId,
      tokenType: validatedData.tokenType,
      doctorId: validatedData.doctorId
    }, () => req.app.get('io'));

    res.status(201).json({ success: true, data: token });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    next(error);
  }
}

async function callNext(req, res, next) {
  try {
    const { doctorId } = req.body;
    const targetDoctorId = doctorId || req.user._id;

    const token = await tokenService.callNextToken(targetDoctorId, () => req.app.get('io'));
    if (!token) {
      return res.json({ success: true, message: 'No waiting patients in queue', data: null });
    }

    res.json({ success: true, data: token });
  } catch (error) {
    next(error);
  }
}

async function completeToken(req, res, next) {
  try {
    const { tokenId } = req.params;
    const token = await tokenService.completeToken(tokenId, () => req.app.get('io'));
    res.json({ success: true, data: token });
  } catch (error) {
    next(error);
  }
}

async function skipToken(req, res, next) {
  try {
    const { tokenId } = req.params;
    const token = await tokenService.skipToken(tokenId, () => req.app.get('io'));
    res.json({ success: true, data: token });
  } catch (error) {
    next(error);
  }
}

async function cancelToken(req, res, next) {
  try {
    const { tokenId } = req.params;
    const token = await tokenService.cancelToken(tokenId, req.user._id, () => req.app.get('io'));
    res.json({ success: true, data: token });
  } catch (error) {
    next(error);
  }
}

async function getMyTokens(req, res, next) {
  try {
    const tokens = await Token.find({ patientId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('departmentId', 'name code')
      .populate('doctorId', 'roomNumber');

    res.json({ success: true, data: tokens });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createToken,
  callNext,
  completeToken,
  skipToken,
  cancelToken,
  getMyTokens
};

