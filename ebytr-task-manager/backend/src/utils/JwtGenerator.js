const jwt = require('jsonwebtoken');
require('dotenv/config');

class JwtGenerator {
  constructor() {
    this.jwtConfig = {
      expiresIn: '2h',
      algorithm: 'HS256',
    };
    this.secret = process.env.JWT_SECRET;
  }

  generateToken(email, password) {
    const data = {
      email,
      password,
    };
    const token = jwt.sign(data, this.secret, this.jwtConfig);
    return token;
  }
}

module.exports = new JwtGenerator();
