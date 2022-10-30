const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const { 
  sellers,
  token,
  tokenData,
} = require('./mocks/getAllSellersMock');



const { expect } = require('chai');

chai.use(chaiHttp);

describe('GET /api/sellers', () => {
  describe('200 OK - Encontra todo os vendedores no banco', () => {
    let chaiHttpResponse;

    before(() => {
      sinon 
        .stub(User, 'findAll')
        .resolves(sellers);

      sinon.
        stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      User.findAll.restore();
      jwt.verify.restore();
    });

    it('encontra todos os vendedores.', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/sellers')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(sellers);
    });
  });

  describe('401 UNAUTHORIZED - Problema com o Token de autenticação', () => {
    let chaiHttpResponse;

    before(() => {
      const jwtError = new Error()
      jwtError.name = 'JsonWebTokenError';
      sinon.
        stub(jwt, 'verify')
        .throws(jwtError);
    });

    after(() => {
      jwt.verify.restore();
    });

    it('não envia o token', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/sellers');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'missing authorization token'});
    });

    it('token inválido ou expirado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/sellers')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Invalid token or Expired Token'});
    });
  });

  

  describe('500 INTERNAL ERROR - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon 
        .stub(User, 'findAll')
        .throws(new Error());

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      User.findAll.restore();
      jwt.verify.restore();
    });

    it('erro interno', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/sellers')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Internal server error'});
    });
  });
});