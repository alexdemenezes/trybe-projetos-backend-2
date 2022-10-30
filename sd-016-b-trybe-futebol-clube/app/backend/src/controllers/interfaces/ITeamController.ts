import { Response, Request } from 'express';

export default interface ITeamController {
  getAll(req: Request, res:Response): Promise<Response>;
  getById(req: Request, res:Response): Promise<Response>;
}
