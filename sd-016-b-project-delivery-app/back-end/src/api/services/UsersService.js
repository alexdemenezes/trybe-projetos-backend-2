const md5 = require('md5');
const { NotFoundError, ConflictError } = require('restify-errors');
const UserModel = require('../models/UserModel');
const JwtGenerator = require('../../utils/JwtGenerator');

class UsersService {
  constructor() {
    this.userModel = new UserModel();
  }
  
  async getAll() {
    const users = await this.userModel.getAll();
    return users;
  }

  async getAllSellers() {
    const sellers = await this.userModel.getAllSellers();
    return sellers;
  }

  async login(email, password) {
    const user = await this.userModel.getByEmail(email);
    if (user && user.password === md5(password)) {
      const token = JwtGenerator.generateToken({ 
        id: user.id, 
        name: user.name, 
        email, 
        role: user.role, 
      });
      const { name, role } = user;
      return {
        name,
        email,
        role,
        token,
      };
    }
    throw new NotFoundError('invalid credentials');
  }

  async create(user) {
    const nameExists = await this.userModel.getByName(user.name);
    const emailExists = await this.userModel.getByEmail(user.email);

    if (!nameExists && !emailExists) {
      await this.userModel.create({ isAdmin: false }, { ...user, password: md5(user.password) });
    } else {
      throw new ConflictError('email or password already used!');
    }
  }

  async adminCreate(payload) {
    const nameExists = await this.userModel.getByName(payload.name);
    const emailExists = await this.userModel.getByEmail(payload.email);

    if (!nameExists && !emailExists) {
      await this.userModel.create(
        { isAdmin: true }, 
        { ...payload, password: md5(payload.password) },
);
    } else {
      throw new ConflictError('email or password already used!');
    }
  }

  async adminDelete(id) {
    const user = await this.userModel.getById(id);
    if (user) {
      await this.userModel.delete(id);
    } else {
      throw new NotFoundError('user do not exists');
    }
  }
}

module.exports = UsersService;