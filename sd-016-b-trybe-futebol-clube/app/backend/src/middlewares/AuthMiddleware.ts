import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';

export default class AuthMiddleware {
  private _SECRET: Secret;

  constructor() {
    this._SECRET = fs.readFileSync('jwt.evaluation.key');
  }

  verifyToken(req:Request, res:Response, next: NextFunction): Response | void {
    const { authorization: token } = req.headers;
    if (token) {
      try {
        const decoded = jwt.verify(token, this._SECRET);
        req.body.decoded = decoded;
        return next();
      } catch (e) {
        return res.status(401).json({ message: 'token is invalid or expired!' });
      }
    }

    return res.status(401).json({ message: 'token not found!' });
  }
}
