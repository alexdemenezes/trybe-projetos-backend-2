const jwt = require('jsonwebtoken');
require('dotenv/config');

class AuthMiddleware {
  static verifyToken(req, res, next) {
    const { authorization: token } = req.headers;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.decoded = decoded;
        return next();
      } catch (e) {
        return res.status(401).json({ message: 'Token is invalid or expired' });
      }
    } else {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  }
}

module.exports = AuthMiddleware;
