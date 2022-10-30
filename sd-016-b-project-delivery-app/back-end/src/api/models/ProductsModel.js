const { Product } = require('../../database/models');

class ProductsModel {
  constructor() {
    this.product = Product;
  }

  async getAll() {
    return this.product.findAll();
  }
}

module.exports = ProductsModel;
