const { NotFoundError, UnauthorizedError } = require('restify-errors');
const { statusValidatorClient, statusValidatorSeller } = require('../../utils/statusValidate');
const SalesModel = require('../models/SalesModel');

class SalesService {
  constructor() {
    this.salesModel = new SalesModel();
  }

  async getByUser(userId) {
    return this.salesModel.getByUser(userId);
  }

  async getBySeller(sellerId) {
    return this.salesModel.getBySeller(sellerId);
  }

  async getById(id) {
    const saleFound = await this.salesModel.getById(id);

    if (!saleFound) throw new NotFoundError('Sale not found');

    return saleFound;
  }

  async create(sale) {
    return this.salesModel.create(sale);
  }

  async changeStatus(status, saleId, role) {
    await this.getById(saleId);
    if (statusValidatorClient(role, status) || statusValidatorSeller(role, status)) {
      return this.salesModel.changeStatus(saleId, status);
    }
    throw new UnauthorizedError('Access denied');
  }
}

module.exports = SalesService;
