const { Op } = require('sequelize');
const { User } = require('../../database/models');

class UserModel {
  constructor() {
    this.user = User;
  }

  async getAll() {
    const users = await this.user.findAll({
      where: {
        [Op.or]: [
          { role: 'administrator' },
          { role: 'customer' },
        ],
      },
    });
    return users;
  }

  async getAllSellers() {
    const users = await this.user.findAll({
      where: {
        role: 'seller',
      },
      attributes: { exclude: ['password'] },
    });
    return users;
  }
  
  async getById(id) {
    const user = await this.user.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async getByEmail(email) {
    const user = await this.user.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async getByName(name) {
    const user = await this.user.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  async create(admin, payload) {
    const { isAdmin } = admin;
    const { name, email, password, role } = payload;

    if (isAdmin) {
      await this.user.create({
        name, 
        email,
        password,
        role,
      });
    } else {
      await this.user.create({
        name, 
        email,
        password,
      });
    }
  }

  async delete(id) {
      await this.user.destroy({
        where: {
          id,
        },
      });
  }
}

module.exports = UserModel;