const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const { 
  user, 
  credentials , 
  loginData, 
  token, 
  wrongCredentials,
  invalidEmailField,
  invalidPasswordField,
} = require('./mocks/loginMock');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('POST /api/users/login', () => {
  describe('200 OK - Sucesso', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(user);

      sinon
        .stub(jwt, 'sign')
        .returns(token)
    });

    after(() => {
      User.findOne.restore();
      jwt.sign.restore();
    });

    it('sucesso no login quando passa as credenciais válidas.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send(credentials);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(loginData);
    })
  })

  describe('404 NotFound - Credenciais inválidas', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      sinon
        .stub(jwt, 'sign')
        .returns(token)
    });

    after(() => {
      User.findOne.restore();
      jwt.sign.restore();
    });

    it('falha no login quando passa as credenciais inválidas.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send(wrongCredentials);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'invalid credentials'});
    })
  })

  describe('400 BadRequest - Campos com válores inválidos.', () => {
    let chaiHttpResponse;

    it('falha no login quando passa email com formato inválido.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send(invalidEmailField);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Please provide a valid email adress'});
    })

    it('falha no login quando passa senha com formato inválido.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send(invalidPasswordField);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: '"password" length must be equal or greater than 6'});
    })

    it('falha no login quando não envia o email.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send({ password: invalidEmailField.password });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
    })

    it('falha no login quando não envia a senha.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send({ email: invalidPasswordField.email });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
    })
  })

  describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .throws(new Error());
    });

    after(() => {
      User.findOne.restore();
    });

    it('trata algum erro inesperado.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/login')
        .send(credentials);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Internal server error'});
    })
  })


})