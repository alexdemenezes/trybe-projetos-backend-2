const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const { Sale } = require('../database/models');
const { decodedClient, salesById, token } = require('./mocks/salesGetByIdMock');
const app = require('../api/app');

chai.use(chaiHttp);

describe('GET /api/sales/:id', () => {
  describe('200 OK - Sucesso ', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'findOne').resolves(salesById);
      sinon.stub(jwt, 'verify').returns(decodedClient);
    });

    after(() => {
      Sale.findOne.restore();
      jwt.verify.restore();
    });

    it('Retorna a venda referente ao id passado no token de autorização e seus respectivos produtos.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/api/sales/43')
        .set('authorization', token)
        .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(salesById);
    });
  });

  describe('401 UnauthorizedError - Faltando token de autorização.', () => {
    let chaiHttpResponse;

    it('Falha quando não passa o token de autorização.', async () => {
      chaiHttpResponse = await chai.request(app).get('/api/sales').send();

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('missing authorization token');
    });
  });

  describe('404 NotFoundError - ID errado.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'findOne').resolves(null);
      sinon.stub(jwt, 'verify').returns(decodedClient);
    });

    after(() => {
      Sale.findOne.restore();
      jwt.verify.restore();
    });

    it('Falha quando passa um ID inexistente.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/api/sales/100')
        .set('authorization', token)
        .send();

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('Sale not found');
    });
  });

  describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(Sale, 'findOne').throws({ Error: 'unexpected error.' });
      sinon.stub(jwt, 'verify').returns(decodedClient);
    });

    after(() => {
      Sale.findOne.restore();
      jwt.verify.restore();
    });

    it('trata algum erro inesperado.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/api/sales/43')
        .set('authorization', token)
        .send();

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
      expect(chaiHttpResponse.status).to.be.equal(500);
    });
  });
});
