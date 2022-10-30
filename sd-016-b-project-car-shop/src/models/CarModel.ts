import { Model } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { Model as IModel } from '../interfaces/ModelInterface';
import carMongooseModel from '../schemas/carSchema';

export default class CarModel implements IModel<Car> {
  protected _mongooseModel: Model<Car>;

  constructor() {
    this._mongooseModel = carMongooseModel;
  }

  async create(data: Car): Promise<Car> {
    const result = await this._mongooseModel.create(data);
    return result;
  }

  async read(): Promise<Car[]> {
    const result = await this._mongooseModel.find();
    return result;
  }

  async readOne(id: string): Promise<Car | null> {
    const result = await this._mongooseModel.findById(id);
    return result;
  }

  async update(id: string, data: Car): Promise<Car | null> {
    const result = await this._mongooseModel
      .findOneAndUpdate({ _id: id }, data, { returnOriginal: false });
    return result;
  }

  async delete(id: string): Promise<Car | null> {
    const result = await this.readOne(id);
    await this._mongooseModel.deleteOne({ _id: id });
    return result;
  }
} 
