const express = require('express');
const TasksMiddleware = require('../middlewares/TasksMiddleware');
const TasksController = require('../controllers/TasksController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get(
  '/',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res) => TasksController.getAll(req, res),
);

router.get(
  '/:id',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res) => TasksController.getById(req, res),
);

router.post(
  '/',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res, next) => TasksMiddleware.verfifyTitle(req, res, next),
  (req, res, next) => TasksMiddleware.verifyStatus(req, res, next),
  (req, res) => TasksController.create(req, res),
);

router.post(
  '/update',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res, next) => TasksMiddleware.verfifyTitle(req, res, next),
  (req, res, next) => TasksMiddleware.verifyStatus(req, res, next),
  (req, res) => TasksController.update(req, res),
);

router.delete(
  '/:id',
  (req, res, next) => AuthMiddleware.verifyToken(req, res, next),
  (req, res) => TasksController.delete(req, res),
);

module.exports = router;
