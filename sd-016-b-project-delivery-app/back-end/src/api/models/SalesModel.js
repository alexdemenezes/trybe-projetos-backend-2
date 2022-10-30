const Sequelize = require('sequelize');
const config = require('../../database/config/config');
const { Sale, Product, SaleProduct } = require('../../database/models');

class SalesModel {
  constructor() {
    this.sale = Sale;
    this.saleProduct = SaleProduct;
    this.sequelize = new Sequelize(config.development);
  }

  async getByUser(userId) {
    return this.sale.findAll({ where: { userId } });
  }

  async getBySeller(sellerId) {
    return this.sale.findAll({ where: { sellerId } });
  }

  async getById(id) {
    return this.sale.findOne({
      where: { id },
      include: [
        {
          model: SaleProduct,
          as: 'saleProduct',
          include: [{ model: Product, as: 'product' }],
          attributes: { exclude: ['saleId', 'productId'] },
        },
      ],
    });
  }

  async create(sale) {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleProducts } = sale;

    const saleId = await this.sequelize.transaction(async (t) => {
      const saleCreated = await this.sale.create(
        { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
        { transaction: t },
      );

      await Promise.all(
        saleProducts.map(async ({ productId, quantity }) => {
          await this.saleProduct.create(
            { saleId: saleCreated.id, productId, quantity },
            { transaction: t },
          );
        }),
      );

      return saleCreated.id;
    });

    return saleId;
  }

  async changeStatus(saleId, status) {
    const newStatus = await this.sale.update({ status }, { where: { id: saleId } });
    return newStatus;
  }
}

module.exports = SalesModel;
