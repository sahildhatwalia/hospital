const TokenService = require('../services/TokenService');
const { sendSuccess } = require('../utils/responseFormatter');

const tokenService = new TokenService();

async function generateToken(req, res, next) {
  try {
    const getIo = () => req.app.get('io');
    const token = await tokenService.generateToken(req.body, getIo);
    return sendSuccess(res, token, 'Token generated successfully', 201);
  } catch (err) {
    next(err);
  }
}

async function callNextToken(req, res, next) {
  try {
    const getIo = () => req.app.get('io');
    const { doctorId } = req.body;
    const token = await tokenService.callNextToken(doctorId || req.user?._id, getIo);
    if (!token) {
      return sendSuccess(res, null, 'No tokens currently waiting in queue', 200);
    }
    return sendSuccess(res, token, 'Next token called into consultation', 200);
  } catch (err) {
    next(err);
  }
}

async function completeToken(req, res, next) {
  try {
    const getIo = () => req.app.get('io');
    const { id } = req.params;
    const token = await tokenService.completeToken(id, getIo);
    return sendSuccess(res, token, 'Token marked as completed', 200);
  } catch (err) {
    next(err);
  }
}

async function skipToken(req, res, next) {
  try {
    const getIo = () => req.app.get('io');
    const { id } = req.params;
    const token = await tokenService.skipToken(id, getIo);
    return sendSuccess(res, token, 'Token skipped', 200);
  } catch (err) {
    next(err);
  }
}

async function emergencyBumpToken(req, res, next) {
  try {
    const getIo = () => req.app.get('io');
    const { id } = req.params;
    const token = await tokenService.emergencyBumpToken(id, getIo);
    return sendSuccess(res, token, 'Token bumped to Emergency priority', 200);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  generateToken,
  callNextToken,
  completeToken,
  skipToken,
  emergencyBumpToken,
};
