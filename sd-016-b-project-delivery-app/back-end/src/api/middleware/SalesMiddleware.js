const { BadDigestError } = require('restify-errors');

class SalesMiddleware {
  constructor() {
    this.invalidFieldMessage = 'All fields must be filled';
  }

  verifyTotalPrice(req, _res, next) {
    const { totalPrice } = req.body;

    if (!totalPrice) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    next();
  }

  verifyDeliveryAddress(req, _res, next) {
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    next();
  }

  verifyDeliveryNumber(req, _res, next) {
    const { deliveryNumber } = req.body;

    if (!deliveryNumber) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    next();
  }

  verifySaleProducts(req, _res, next) {
    const { saleProducts } = req.body;

    if (!saleProducts || saleProducts.length === 0) {
      throw new BadDigestError(this.invalidFieldMessage);
    }

    saleProducts.forEach((saleProduct) => {
      if (!saleProduct.productId || !saleProduct.quantity) {
        throw new BadDigestError(this.invalidFieldMessage);
      }
    });

    next();
  }
}

module.exports = SalesMiddleware;
