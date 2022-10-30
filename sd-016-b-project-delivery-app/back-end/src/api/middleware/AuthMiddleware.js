const jwt = require('jsonwebtoken');
const fs = require('fs');
const { UnauthorizedError } = require('restify-errors');

class AuthMiddleware {
  constructor() {
    this.secret = fs.readFileSync('./jwt.evaluation.key');
  }
  
  verifyToken(req, res, next) {
    const { authorization: token } = req.headers;
    if (token) {
      const decoded = jwt.verify(token, this.secret);
      req.body.decoded = decoded;
      next();
    } else {
      throw new UnauthorizedError('missing authorization token');
    }
  }
}

module.exports = AuthMiddleware;