const bcrypt = require('bcryptjs');

class HashGenerator {
  constructor(password) {
    this.password = password;
  }

  passwordToHash() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    return hash;
  }
}

module.exports = HashGenerator;
