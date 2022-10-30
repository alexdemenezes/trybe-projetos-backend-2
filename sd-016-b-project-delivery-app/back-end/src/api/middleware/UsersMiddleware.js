const validator = require('email-validator');
const { BadDigestError } = require('restify-errors');

class UsersMiddleware {
  constructor() {
    this.invalidFieldMessage = 'All fields must be filled';
  }

   verifyName(req, _res, next) {
    const { name } = req.body;
    if (!name) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    if (name.length < 12) {
      throw new BadDigestError('"name" length must be equal or greater than 12');
    }
    return next();
  }

  verifyEmail(req, _res, next) {
    const { email } = req.body;
    if (!email) {
      throw new BadDigestError(this.invalidFieldMessage);
    }
    const valid = validator.validate(email);
    if (!valid) {
      throw new BadDigestError('Please provide a valid email adress');
    }
    return next();
  }

  verifyPassword(req, _res, next) {
    const { password } = req.body;
    if (!password) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    if (password.length < 6) {
      throw new BadDigestError('"password" length must be equal or greater than 6');
    }
    return next();
  }

  verifyRole(req, _res, next) {
    const { role } = req.body;
    if (!role && role !== 'administrator') {
      throw new BadDigestError(this.invalidFieldMessage);
    } else {
      next();
    }
  }
}

module.exports = UsersMiddleware;