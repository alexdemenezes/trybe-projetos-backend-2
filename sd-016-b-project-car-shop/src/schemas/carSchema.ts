import { model, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';

const modelSchema = new Schema<Car>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

const carMongooseModel = model('cars', modelSchema);

export default carMongooseModel;