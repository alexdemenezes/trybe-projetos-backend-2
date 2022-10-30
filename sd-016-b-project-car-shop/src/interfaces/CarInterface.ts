import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const carSchema = z.object({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type AnyCar = z.infer< typeof carSchema>;

interface Car extends Vehicle, AnyCar {

}

export { Car, carSchema };