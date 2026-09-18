require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET;

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('FATAL SECURITY ERROR: JWT_SECRET environment variable must be explicitly set in production mode.');
}

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/hqms',
  JWT_SECRET: JWT_SECRET || 'dev_fallback_jwt_secret_nexline_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3001',
};
