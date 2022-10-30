import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import MatchFactory from '../database/factories/MatchFactory';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const route = express();

const matchController = MatchFactory.create();
const authMiddleware = new AuthMiddleware();

route.get('/', (req: Request, res: Response) => matchController.getAll(req, res));
route.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response) => matchController.create(req, res),
);
route.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response) => matchController.updateProgress(req, res),
);
route.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response) => matchController.update(req, res),
);

export default route;
