import { Request, Response } from 'express';
import CarsService from '../services/CarsService';

export default class CarsController {
  protected _carsService: CarsService;

  private _internalError = { message: 'internal error' };

  private _lengthOfId = { error: 'Id must have 24 hexadecimal characters' };

  private _notFound = { error: 'Object not found' };

  constructor(carsService: CarsService) {
    this._carsService = carsService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const car = await this._carsService.create(req.body);
      return res.status(201).json(car);
    } catch (e) {
      return res.status(500).json(this._internalError);
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const cars = await this._carsService.read();
      return res.status(200).json(cars);
    } catch (e) {
      return res.status(500).json(this._internalError);
    }
  }

  async readOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400)
          .json(this._lengthOfId);
      }
      const car = await this._carsService.readOne(id);
      if (!car) {
        return res.status(404).json(this._notFound);
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json(this._internalError);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400)
          .json(this._lengthOfId);
      }
      const car = await this._carsService.update(id, req.body);
      if (!car) {
        return res.status(404).json(this._notFound);
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500).json(this._internalError);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400)
          .json(this._lengthOfId);
      }
      const car = await this._carsService.delete(id);
      if (!car) {
        return res.status(404).json(this._notFound);
      }
      return res.status(204).json();
    } catch (e) {
      return res.status(500).json(this._internalError);
    }
  }
}