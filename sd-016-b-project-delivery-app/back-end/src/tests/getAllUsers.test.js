const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const {
  users,
  token,
  tokenData,
  clientData,
} = require('./mocks/getAllUsersMock');

const { expect } = require('chai');

chai.use(chaiHttp);

describe('GET /api/admin/users', () => {
  describe('200 OK - retorna todos os usuários que não são administradores', () => {
    let chaiHttpResponse;

    before(() => {
      sinon 
        .stub(User, 'findAll')
        .resolves(users);

      sinon.
        stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      User.findAll.restore();
      jwt.verify.restore();
    });

    it('encontra todos os usuários.', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/admin/users')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(users);
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
      .get('/api/admin/users');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'missing authorization token'});
    });

    it('token inválido ou expirado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/admin/users')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Invalid token or Expired Token'});
    });
  });

  describe('401 UNAUTHORIZED - Usuário autenticado não é administrador', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.
        stub(jwt, 'verify')
        .returns(clientData);
    });

    after(() => {
      jwt.verify.restore();
    });

    it('acesso negado.', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/api/admin/users')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Access denied'});
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
      .get('/api/admin/users')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Internal server error'});
    });
  });
});
