import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default class CarsMiddleware {
  static validateAttributes(req: Request, res: Response, next: NextFunction) {
    const { error } = Joi.object({
      _id: Joi.string(),
      model: Joi.string().min(3).required(),
      year: Joi.number().max(2022).min(1900).required(),
      color: Joi.string().min(3).required(),
      status: Joi.boolean(),
      buyValue: Joi.number().required(),
      doorsQty: Joi.number().max(4).min(2).required(),
      seatsQty: Joi.number().max(7).min(2).required(),
    }).validate(req.body);
    if (error) {
      if (error.isJoi) {
        return res.status(400).json({ message: error.details[0].message });
      }
      return res.status(400).json({ message: error.message });
    }
    next();
  }

  static validateEmptyBody(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'empty body' });
    }

    next();
  }
}