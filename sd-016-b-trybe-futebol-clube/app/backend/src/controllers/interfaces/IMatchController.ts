import { Response, Request } from 'express';

export default interface IMatch {
  getAll(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  updateProgress(req: Request, res: Response): Promise<Response>;
}
