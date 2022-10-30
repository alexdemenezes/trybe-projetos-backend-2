const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { User } = require('../database/models');
const { expect } = require('chai');
const { 
  validData, 
  dataWithEmailAlreadyUsed, 
  dataWithNameAlreadyUsed,
  dataWithInvalidEmail,
  dataWithInvalidName,
  dataWithInvalidPassword,
  dataWithoutEmail,
  dataWithoutPassword,
  dataWithoutName,
} = require('./mocks/registerMock');

chai.use(chaiHttp);

describe('POST api/users/register', () => {
  describe('201 CREATED - Sucesso', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      sinon
        .stub(User, 'create')
        .resolves(true);
    });

    after(() => {
      User.findOne.restore();
      User.create.restore();
    });

    it('sucesso ao criar usuário quando passa dados válidos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(validData);


      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  })

  describe('201 CREATED - Sucesso', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      sinon
        .stub(User, 'create')
        .resolves(true);
    });

    after(() => {
      User.findOne.restore();
      User.create.restore();
    });

    it('sucesso ao criar usuário quando passa dados válidos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(validData);


      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  })



  describe('400 BadRequest - Campos com válores inválidos.', () => {
    let chaiHttpResponse;

    it('falha ao tentar registrar usuário com formato do email inválido.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithInvalidEmail);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Please provide a valid email adress'});
    });

    it('falha ao tentar registrar usuário com formato da senha inválido.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithInvalidPassword);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: '"password" length must be equal or greater than 6'});
    })

    it('falha ao tentar registrar usuário com nome inválido.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithInvalidName);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: '"name" length must be equal or greater than 12'});
    })

    it('falha no registro quando não envia o email.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithoutEmail);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
    })

    it('falha no registro quando não envia a senha.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithoutPassword);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
    })

    it('falha no registro quando não envia o nome.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithoutName);

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
    })
  })
  
  describe('409 Conflito - email ou nome já está vinculado a uma conta.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(true);
    });

    after(() => {
      User.findOne.restore();
    });

    it('nome já cadastrado!', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithNameAlreadyUsed);
      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'email or password already used!'})
    });

    it('email já cadastrado!', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/users/register')
        .send(dataWithEmailAlreadyUsed);


      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'email or password already used!'})
    });
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
        .post('/api/users/register')
        .send(validData);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Internal server error'});
    })
  })
})