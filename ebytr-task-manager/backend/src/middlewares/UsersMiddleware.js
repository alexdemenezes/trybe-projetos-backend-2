/* eslint-disable class-methods-use-this */
const validator = require('email-validator');

class UsersMiddleware {
  verifyUsername(req, res, next) {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (username.length < 6) {
      return res.status(400).json({ message: '"username" length must be equal or greater than 6' });
    }
    return next();
  }

  verifyEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const valid = validator.validate(email);
    if (!valid) {
      return res.status(400).json({ message: 'Please provide a valid email adress' });
    }
    return next();
  }

  verifyPassword(req, res, next) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: '"password" length must be equal or greater than 8' });
    }
    return next();
  }
}

module.exports = new UsersMiddleware();
