const ProductsModel = require('../models/ProductsModel');

class ProductsService {
  constructor() {
    this.productsModel = new ProductsModel();
  }

  async getAll() {
    return this.productsModel.getAll();
  }
}

module.exports = ProductsService;
