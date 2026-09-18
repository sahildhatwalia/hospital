const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const env = require('../config/env');
const MongooseUserRepository = require('../repositories/MongooseUserRepository');

class AuthService {
  constructor(userRepo = new MongooseUserRepository()) {
    this.userRepo = userRepo;
  }

  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN || '8h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(userData) {
    const existing = await this.userRepo.findByEmail(userData.email);
    if (existing) {
      throw new AppError('User with this email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepo.createUser({
      ...userData,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { userId: newUser._id, role: newUser.role, email: newUser.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN || '8h' }
    );

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
    };
  }
}

module.exports = AuthService;
