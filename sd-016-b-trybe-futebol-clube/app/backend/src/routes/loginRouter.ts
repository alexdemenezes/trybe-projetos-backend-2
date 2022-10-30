import { Response, Request, NextFunction } from 'express';
import * as express from 'express';
import Userfactory from '../database/factories/UserFactory';
import LoginMiddleware from '../middlewares/loginMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const route = express();
const userController = Userfactory.create();
const loginMiddleware = new LoginMiddleware();
const authMiddleware = new AuthMiddleware();

route.post(
  '/',
  (req: Request, res: Response, next:NextFunction) =>
    loginMiddleware.verifyEmail(req, res, next),
  (req: Request, res: Response, next:NextFunction) =>
    loginMiddleware.verifyPassword(req, res, next),
  (req: Request, res: Response) => userController.login(req, res),
);

route.get(
  '/validate',
  (req: Request, res: Response, next: NextFunction) => authMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default route;
