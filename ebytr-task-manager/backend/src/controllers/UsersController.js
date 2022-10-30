const UsersService = require('../services/UsersService');

class UsersController {
  async create(req, res) {
    try {
      const newUser = await UsersService.create(req.body);
      if (newUser) {
        return res.status(201).json(newUser);
      }
      return res.status(409).json({ message: 'email already used' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const loginData = await UsersService.login(email, password);
      if (loginData) {
        return res.status(200).json(loginData);
      }
      return res.status(401).json({ message: 'Incorrect email or password' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UsersService.getById(+id);
      if (user) {
        user.password = '';
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'user not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async updateUsername(req, res) {
    try {
      const { email } = req.body.decoded;
      const { username } = req.body;
      await UsersService.updateUsername(username, email);
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async updateEmail(req, res) {
    try {
      const { email } = req.body.decoded;
      const { email: newEmail } = req.body;
      await UsersService.updateEmail(newEmail, email);
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async updatePassword(req, res) {
    try {
      const { email } = req.body.decoded;
      const { password } = req.body;
      await UsersService.updatePassword(password, email);
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { email } = req.body.decoded;
      await UsersService.deleteUser(email);
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}
module.exports = new UsersController();
