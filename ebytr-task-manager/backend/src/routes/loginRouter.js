const express = require('express');
const UsersController = require('../controllers/UsersController');
const UsersMiddleware = require('../middlewares/UsersMiddleware');

const router = express.Router();

router.post(
  '/',
  (req, res, next) => UsersMiddleware.verifyEmail(req, res, next),
  (req, res, next) => UsersMiddleware.verifyPassword(req, res, next),
  (req, res) => UsersController.login(req, res),
);

module.exports = router;
