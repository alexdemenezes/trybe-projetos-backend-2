const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const { Sale } = require('../database/models');
const { decodedSeller, token, salesBySeller } = require('./mocks/salesGetBySellerMock');
const app = require('../api/app');

chai.use(chaiHttp);

describe('GET /api/sales/seller', () => {
  describe('200 OK - Sucesso ', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'findAll').resolves(salesBySeller);
      sinon.stub(jwt, 'verify').returns(decodedSeller);
    });

    after(() => {
      Sale.findAll.restore();
      jwt.verify.restore();
    });

    it('Retorna um array com os dados das vendas do vendedor passado no token de autorização.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/api/sales/seller')
        .set('authorization', token)
        .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(salesBySeller);
    });
  });

  describe('401 UnauthorizedError - Faltando token de autorização.', () => {
    let chaiHttpResponse;

    it('Falha quando não passa o token de autorização.', async () => {
      chaiHttpResponse = await chai.request(app).get('/api/sales/seller').send();

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('missing authorization token');
    });
  });

  describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'findAll').throws({ Error: 'unexpected error.' });
      sinon.stub(jwt, 'verify').returns(decodedSeller);
    });

    after(() => {
      Sale.findAll.restore();
      jwt.verify.restore();
    });

    it('trata algum erro inesperado.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/api/sales/seller')
        .set('authorization', token)
        .send();

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
      expect(chaiHttpResponse.status).to.be.equal(500);
    });
  });
});
