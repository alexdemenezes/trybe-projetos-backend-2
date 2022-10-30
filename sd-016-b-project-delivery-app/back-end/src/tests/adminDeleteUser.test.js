const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const {
  user,
  token,
  tokenData,
  clientData
} = require('./mocks/adminDeleteUserMock');

const { expect } = require('chai');

chai.use(chaiHttp);

describe('DELETE /api/admin/:id', () => {
  describe('204 NO CONTENT - exclui um usuário com sucesso', () => {
    let chaiHttpResponse;

    before(() => {
      sinon 
        .stub(User, 'findOne')
        .resolves(user);
      sinon
        .stub(User, 'destroy')
        .resolves(true);

      sinon.
        stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      User.findOne.restore();
      User.destroy.restore();
      jwt.verify.restore();
    });

    it('exclui o usuário com o id 3', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/api/admin/3')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(204);
    });
  });

  describe('404 NOT FOUND - usuário não encontrado pelo id informado', () => {
    let chaiHttpResponse;

    before(() => {
      sinon 
        .stub(User, 'findOne')
        .resolves(null);

      sinon.
        stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('exclui o usuário com o id 3', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/api/admin/3')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'user do not exists'});
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
      .delete('/api/admin/4');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'missing authorization token'});
    });

    it('token inválido ou expirado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .delete('/api/admin/4')
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
      .delete('/api/admin/3')
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
      .delete('/api/admin/3')
      .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Internal server error'});
    });
  });
});