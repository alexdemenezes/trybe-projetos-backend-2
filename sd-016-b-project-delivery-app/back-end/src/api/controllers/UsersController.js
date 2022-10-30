const { StatusCodes } = require('http-status-codes');
const UsersService = require('../services/UsersService');

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  async getAll(req, res) {
    const users = await this.usersService.getAll();
    return res.status(StatusCodes.OK).json(users);
  }

  async getAllSellers(req, res) {
    const sellers = await this.usersService.getAllSellers();
    return res.status(StatusCodes.OK).json(sellers);
  }

  async login(req, res) {
    const { email, password } = req.body;
    
    const result = await this.usersService.login(email, password);
    return res.status(StatusCodes.OK).json(result);
  }

  async create(req, res) {
    await this.usersService.create(req.body);
    return res.status(StatusCodes.CREATED).end();
  }

  async adminCreate(req, res) {
    await this.usersService.adminCreate(req.body);
    return res.status(StatusCodes.CREATED).end();
  }

  async adminDelete(req, res) {
    const { id } = req.params;
    await this.usersService.adminDelete(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  }
}

module.exports = UsersController;