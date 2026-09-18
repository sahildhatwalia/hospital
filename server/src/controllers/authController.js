const AuthService = require('../services/AuthService');
const { sendSuccess } = require('../utils/responseFormatter');

const authService = new AuthService();

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return sendSuccess(res, result, 'Logged in successfully', 200);
  } catch (err) {
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    return sendSuccess(res, result, 'User registered successfully', 201);
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    return sendSuccess(res, req.user, 'Profile fetched successfully', 200);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  register,
  getProfile,
};
