const logger = require('../utils/logger');
const { sendError } = require('../utils/responseFormatter');

function errorHandler(err, req, res, next) {
  logger.error({ err, url: req.url, method: req.method }, 'Express Error Handler');

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation error';
    errors = err.errors?.map((e) => ({ field: e.path.join('.'), message: e.message })) || null;
  }

  return sendError(res, message, statusCode, errors);
}

module.exports = errorHandler;
