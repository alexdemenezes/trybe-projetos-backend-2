import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

export default class CarsService {
  protected _carModel: CarModel;

  constructor(carModel: CarModel) {
    this._carModel = carModel;
  }

  async create(data: Car): Promise<Car> {
    const result = await this._carModel.create(data);
    return result;
  } 

  async read(): Promise<Car[]> {
    const result = await this._carModel.read();
    return result;
  }

  async readOne(id: string): Promise<Car | null> {
    const result = await this._carModel.readOne(id);
    return result;
  }

  async update(id: string, data: Car): Promise<Car | null> {
    const result = await this._carModel.update(id, data);
    return result;
  }

  async delete(id: string): Promise<Car | null> {
    const result = await this._carModel.delete(id);
    return result;
  }
}