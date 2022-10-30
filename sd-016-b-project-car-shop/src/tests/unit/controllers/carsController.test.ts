import sinon, { SinonStub } from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/CarModel';
import carMongooseModel from '../../../schemas/carSchema';
import CarsService from '../../../services/CarsService';
import CarsController from '../../../controllers/CarsController';
import { car, carMock, carsMock, internalError } from '../mocks/carsMocks';
import server from '../../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests car Controller', () => {
  describe('create method', () => {
    describe('create a new car', () => {
      let chaiHttpResponse;
      const app = server.getApp();
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'create')
          .resolves(carMock);
      });
    
      after(()=>{
        (carMongooseModel.create as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/cars')
          .send(car);
  
          expect(chaiHttpResponse.body).to.deep.equal(carMock);
      });
    })

    describe('internal error', () => {
      let chaiHttpResponse;
      const app = server.getApp();
      const error = new Error('something went wrong...');
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'create')
          .throws(error)
      });
    
      after(()=>{
        (carMongooseModel.create as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/cars')
          .send(car);

          expect(chaiHttpResponse.status).to.deep.equal(500);
          expect(chaiHttpResponse.body).to.deep.equal(internalError);
      });
    })

  })

  describe('get all', () => {
    describe('get all cars', () => {
      let chaiHttpResponse;
      const app = server.getApp();
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'find')
          .resolves(carsMock as any);
      });
    
      after(()=>{
        (carMongooseModel.find as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/cars');
  
          expect(chaiHttpResponse.body).to.deep.equal(carsMock);
      });
    })

    describe('internal error', () => {
      let chaiHttpResponse;
      const app = server.getApp();
      const error = new Error('something went wrong...');
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'find')
          .throws(error)
      });
    
      after(()=>{
        (carMongooseModel.find as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/cars');

          expect(chaiHttpResponse.status).to.deep.equal(500);
          expect(chaiHttpResponse.body).to.deep.equal(internalError);
      });
    })
  })

  describe('get one', () => {
    describe('get one car by id', () => {
      let chaiHttpResponse;
      const app = server.getApp();
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'findById')
          .resolves(carMock as any);
      });
    
      after(()=>{
        (carMongooseModel.findById as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/cars/62c612022c594fbeb2167930');
  
          expect(chaiHttpResponse.body).to.deep.equal(carMock);
      });
    })

    describe('internal error', () => {
      let chaiHttpResponse;
      const app = server.getApp();
      const error = new Error('something went wrong...');
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'findById')
          .throws(error)
      });
    
      after(()=>{
        (carMongooseModel.findById as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/cars/62c612022c594fbeb2167930');

          expect(chaiHttpResponse.status).to.deep.equal(500);
          expect(chaiHttpResponse.body).to.deep.equal(internalError);
      });
    })
  })


  describe('get update', () => {
    describe('update one car', () => {
      let chaiHttpResponse;
      const app = server.getApp();
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'findOneAndUpdate')
          .resolves(carMock as any);
      });
    
      after(()=>{
        (carMongooseModel.findOneAndUpdate as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .put('/cars/62c612022c594fbeb2167930')
          .send(carMock)
        
          expect(chaiHttpResponse.status).to.deep.equal(200);
          expect(chaiHttpResponse.body).to.deep.equal(carMock);
      });
    })

    describe('internal error', () => {
      let chaiHttpResponse;
      const app = server.getApp();
      const error = new Error('something went wrong...');
  
      before(async () => {
        sinon
          .stub(carMongooseModel, 'findOneAndUpdate')
          .throws(error)
      });
    
      after(()=>{
        (carMongooseModel.findOneAndUpdate as SinonStub).restore();
      })
    
      it('- Success', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .put('/cars/62c612022c594fbeb2167930')
          .send(carMock);

          expect(chaiHttpResponse.status).to.deep.equal(500);
          expect(chaiHttpResponse.body).to.deep.equal(internalError);
      });
    })
  })



});