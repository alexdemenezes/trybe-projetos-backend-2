require('express-async-errors');

const { StatusCodes } = require('http-status-codes');

const handleError = (err, _req, res, _next) => {
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid token or Expired Token',
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};

module.exports = handleError;
