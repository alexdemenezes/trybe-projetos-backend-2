import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import CarModel from '../../../models/CarModel';
import carMongooseModel from '../../../schemas/carSchema';
import { car, carMock, carsMock } from '../mocks/carsMocks';


describe('tests car Model', () => {
  describe('create a new car', () => {
    before(() => {
      sinon 
        .stub(carMongooseModel, 'create')
        .resolves(carMock);
    });

    after(() => {
      (carMongooseModel.create as SinonStub).restore()
    })

    it('- Sucess', async () => {
      const carModel = new CarModel();
      const created = await carModel.create(car);
      
      expect(created).to.be.deep.equal(carMock);
    })
  })

  describe('get all cars', () => {
    before(() => {
      sinon 
        .stub(carMongooseModel, 'find')
        .resolves(carsMock as any);
    });

    after(() => {
      (carMongooseModel.find as SinonStub).restore()
    })

    it('- Sucess', async () => {
      const carModel = new CarModel();
      const cars = await carModel.read();
      
      expect(cars).to.be.deep.equal(carsMock);
    })
  })

  describe('get one car by id', () => {
    before(() => {
      sinon 
        .stub(carMongooseModel, 'findById')
        .resolves(carMock as any);
    });

    after(() => {
      (carMongooseModel.findById as SinonStub).restore()
    })

    it('- Sucess', async () => {
      const carModel = new CarModel();
      const car = await carModel.readOne("62c612022c594fbeb2167930");
      
      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('update', () => {
    before(() => {
      sinon 
        .stub(carMongooseModel, 'findOneAndUpdate')
        .resolves(carMock as any);
    });

    after(() => {
      (carMongooseModel.findOneAndUpdate as SinonStub).restore()
    })

    it('- Sucess', async () => {
      const carModel = new CarModel();
      const car = await carModel.update("62c612022c594fbeb2167930", carMock);
      
      expect(car).to.be.deep.equal(carMock);
    })
  })
});

