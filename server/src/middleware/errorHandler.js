const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error({ err, url: req.url, method: req.method }, 'Express Error Handler');

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

module.exports = errorHandler;
