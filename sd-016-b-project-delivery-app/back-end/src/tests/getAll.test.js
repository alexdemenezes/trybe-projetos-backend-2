const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { Product } = require('../database/models');
const { expect } =  require('chai');
const { allProducts, decoded } = require('./mocks/getAllMock');
const { token } = require('./mocks/changeStatusMock');

chai.use(chaiHttp);

describe('GET /api/products', () => {

  describe('200 OK - Sucesso', () => {
    let chaiHttpResponse;

    describe('Requisitando todos os produtos', () => {
      before(() => {
        sinon
          .stub(Product, 'findAll')
          .resolves(allProducts);

        sinon
          .stub(jwt, 'verify')
          .returns(decoded)
      });

      after(() => {
        Product.findAll.restore();
        jwt.verify.restore();
      });

      it('Sucesso recebendo todos os produtos', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/api/products')
          .set('authorization', token);

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(allProducts);
      })
    })
  })
  
  describe('Falha', () => {
    describe('401 - Sem token', () => {
      it('Tentar pegar produtos', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/api/products');
  
          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal({ message:'missing authorization token' });
      })
    })

    describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
      let chaiHttpResponse;
        before(() => {
          sinon
            .stub(Product, 'findAll')
            .throws(new Error());
    
          sinon
            .stub(jwt, 'verify')
            .returns();
        });
    
        after(() => {
          Product.findAll.restore();
          jwt.verify.restore();
        });
    
        it('trata algum erro inesperado findAll', async () => {
          chaiHttpResponse = await chai
            .request(app)
            .get('/api/products')
            .set('authorization', token);

          expect(chaiHttpResponse.status).to.be.equal(500);
          expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Internal server error'});
        })
    })
  })
})

