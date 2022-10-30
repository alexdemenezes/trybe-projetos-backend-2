const { StatusCodes } = require('http-status-codes');
const ProductsService = require('../services/ProductsService');

class ProductsController {
  constructor() {
    this.productsService = new ProductsService();
  }

  async getAll(_req, res) {
    const productsFound = await this.productsService.getAll();

    res.status(StatusCodes.OK).json(productsFound);
  }
}

module.exports = ProductsController;
