const { Router } = require('express');
const SalesController = require('../controllers/SalesController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const SalesMiddleware = require('../middleware/SalesMiddleware');

const route = Router();

const auth = new AuthMiddleware();
const salesMiddleware = new SalesMiddleware();
const salesController = new SalesController();

route
  .get(
    '/',
    (req, res, next) => auth.verifyToken(req, res, next),
    (req, res) => salesController.getByUser(req, res),
  )
  .get(
    '/seller',
    (req, res, next) => auth.verifyToken(req, res, next),
    (req, res) => salesController.getBySeller(req, res),
  )
  .get(
    '/:id',
    (req, res, next) => auth.verifyToken(req, res, next),
    (req, res) => salesController.getById(req, res),
  )
  .post(
    '/',
    (req, res, next) => auth.verifyToken(req, res, next),
    (req, res, next) => salesMiddleware.verifyTotalPrice(req, res, next),
    (req, res, next) => salesMiddleware.verifyDeliveryAddress(req, res, next),
    (req, res, next) => salesMiddleware.verifyDeliveryNumber(req, res, next),
    (req, res, next) => salesMiddleware.verifySaleProducts(req, res, next),
    (req, res) => salesController.create(req, res),
  )
  .patch(
    '/',
    (req, res, next) => auth.verifyToken(req, res, next),
    (req, res) => salesController.changeStatus(req, res),
  );

module.exports = route;
