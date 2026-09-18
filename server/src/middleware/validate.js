const { sendError } = require('../utils/responseFormatter');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const dataToValidate = source === 'query' ? req.query : source === 'params' ? req.params : req.body;
      const parsed = schema.parse(dataToValidate);
      if (source === 'body') req.body = parsed;
      else if (source === 'query') req.query = parsed;
      else if (source === 'params') req.params = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        const formattedErrors = err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return sendError(res, 'Validation failed', 400, formattedErrors);
      }
      return sendError(res, err.message || 'Invalid input data', 400);
    }
  };
}

module.exports = validate;
