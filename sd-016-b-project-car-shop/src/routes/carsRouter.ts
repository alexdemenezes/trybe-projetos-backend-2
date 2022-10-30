import { Router, Response, Request, NextFunction } from 'express';
import CarsMiddleware from '../middlewares/CarsMiddleware';
import CarModel from '../models/CarModel';
import CarsService from '../services/CarsService';
import CarsController from '../controllers/CarsController';

const router = Router();

const carModel = new CarModel();
const carsService = new CarsService(carModel);
const carsController = new CarsController(carsService);

router.post(
  '/cars',
  CarsMiddleware.validateAttributes,
  CarsMiddleware.validateEmptyBody,
  (req: Request, res: Response) => carsController.create(req, res), 
);

router.get(
  '/cars',
  (req: Request, res: Response) => carsController.read(req, res),
);

router.get(
  '/cars/:id',
  (req: Request, res: Response) => carsController.readOne(req, res),
);

router.put(
  '/cars/:id',
  (req: Request, res: Response, next: NextFunction) => CarsMiddleware
    .validateEmptyBody(req, res, next),
  (req: Request, res: Response) => carsController.update(req, res),
);

router.delete(
  '/cars/:id',
  (req: Request, res: Response) => carsController.delete(req, res),
);

export default router;