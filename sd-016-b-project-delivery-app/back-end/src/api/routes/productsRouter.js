const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const route = Router();

const auth = new AuthMiddleware();
const productsController = new ProductsController();

route.get(
  '/',
  (req, res, next) => auth.verifyToken(req, res, next),
  (req, res) => productsController.getAll(req, res),
);

module.exports = route;
