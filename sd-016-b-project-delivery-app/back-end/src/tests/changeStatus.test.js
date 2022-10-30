const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { Sale } = require('../database/models');
const { token, sellerPreparando, decodedSeller, sellerTransito, decodedClient, clientEntregue } = require('./mocks/changeStatusMock');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('PATCH /api/sales', () => {
  describe('200 OK - Sucesso', () => {
    let chaiHttpResponse;

    describe('Vendedor', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .resolves('teste');
  
        sinon
          .stub(Sale, 'update')
          .resolves([1]);
  
        sinon
          .stub(jwt, 'verify')
          .returns(decodedSeller);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.verify.restore();
        Sale.update.restore();
      });
  
  
      it('Sucesso atualizar status Preparando', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerPreparando);
  
          expect(chaiHttpResponse.status).to.be.equal(200);
          expect(chaiHttpResponse.body).to.be.deep.equal([1]);
      })

      it('Sucesso atualizar status Em trânsito', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerTransito);

          expect(chaiHttpResponse.status).to.be.equal(200);
          expect(chaiHttpResponse.body).to.be.deep.equal([1]);
      })
    })

    describe('Cliente', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .resolves('teste');
  
        sinon
          .stub(Sale, 'update')
          .resolves([1]);
  
        sinon
          .stub(jwt, 'verify')
          .returns(decodedClient);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.verify.restore();
        Sale.update.restore();
      });
  
  
      it('Sucesso atualizar status Entregue', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(clientEntregue);
  
          expect(chaiHttpResponse.status).to.be.equal(200);
          expect(chaiHttpResponse.body).to.be.deep.equal([1]);
      })
    })
  })


  describe('401 - Falha', () => {
    describe('Vendedor', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .resolves('teste');
  
        sinon
          .stub(Sale, 'update')
          .resolves([1]);
  
        sinon
          .stub(jwt, 'verify')
          .returns(decodedSeller);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.verify.restore();
        Sale.update.restore();
      });
  
  
      it('Falha atualizar status Entregue', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(clientEntregue);
  
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message:'Access denied' });
      })
    })


    describe('Cliente', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .resolves('teste');
  
        sinon
          .stub(Sale, 'update')
          .resolves([1]);
  
        sinon
          .stub(jwt, 'verify')
          .returns(decodedClient);
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.verify.restore();
        Sale.update.restore();
      });
  
  
      it('Falha atualizar status Preparando', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerPreparando);
  
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message:'Access denied' });
      })


      it('Falha atualizar status Em Trânsito', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerTransito);
  
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message:'Access denied' });
      })
    })


    describe('Sem token', () => {
      it('Tentar atualizar sem token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .send(clientEntregue);
  
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message:'missing authorization token' });
      })
    })
  })


  describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    describe('findOne', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .throws(new Error());
  
        sinon
          .stub(jwt, 'verify')
          .returns();
      });
  
      after(() => {
        Sale.findOne.restore();
        jwt.verify.restore();
      });
  
      it('trata algum erro inesperado findOne', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerTransito);
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Internal server error'});
      })
    })


    describe('update', () => {
      before(() => {
        sinon
          .stub(Sale, 'findOne')
          .resolves(true);
  
  
        sinon
          .stub(Sale, 'update')
          .throws(new Error());
  
        sinon
          .stub(jwt, 'verify')
          .returns();
      });
  
      after(() => {
        Sale.findOne.restore();
        Sale.update.restore();
        jwt.verify.restore();
      });
  
      it('trata algum erro inesperado findOne', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/api/sales')
          .set('authorization', token)
          .send(sellerTransito);
        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Internal server error'});
      })
    })
  })
})