import { Request, Response } from 'express';
import IUserService from '../services/interfaces/IUserService';
import IUserController from './interfaces/IUserController';

export default class Usercontroller implements IUserController {
  private _UserService: IUserService;

  constructor(UserService: IUserService) {
    this._UserService = UserService;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const result = await this._UserService.login(email, password);

      if (result) {
        return res.status(200).json(result);
      }
      return res.status(401).json({ message: 'Incorrect email or password' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error!' });
    }
  }

  public async getUserRole(req: Request, res: Response): Promise<Response | void> {
    try {
      const { decoded } = req.body;
      const user = await this._UserService.getUserByEmail(decoded.email);
      if (user) {
        return res.status(200).json(user.role);
      }
      return res.status(404).json({ message: 'user not found!' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error!' });
    }
  }
}
