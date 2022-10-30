const { StatusCodes } = require('http-status-codes');
const SalesService = require('../services/SalesService');

class SalesController {
  constructor() {
    this.salesService = new SalesService();
  }

  async getByUser(req, res) {
    const { id: userId } = req.body.decoded;

    const salesFound = await this.salesService.getByUser(userId);

    res.status(StatusCodes.OK).json(salesFound);
  }

  async getBySeller(req, res) {
    const { id: sellerId } = req.body.decoded;

    const salesFound = await this.salesService.getBySeller(sellerId);

    res.status(StatusCodes.OK).json(salesFound);
  }

  async getById(req, res) {
    const { id } = req.params;

    const saleFound = await this.salesService.getById(id);

    res.status(StatusCodes.OK).json(saleFound);
  }

  async create(req, res) {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, saleProducts } = req.body;
    const { id: userId } = req.body.decoded;

    const saleId = await this.salesService.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleProducts,
    });

    res.status(StatusCodes.CREATED).json({ saleId });
  }

  async changeStatus(req, res) {
    const { status, saleId } = req.body;
    const { role } = req.body.decoded;

    const newStatus = await this.salesService.changeStatus(status, saleId, role);
    return res.status(StatusCodes.OK).json(newStatus);
  }
}

module.exports = SalesController;
