/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const bcrypt = require('bcryptjs');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const App = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

const { expect } = chai;

const credentials = {
  email: 'dev.emailtest404@gmail.com',
  password: "'abc123ABC'",
};

const wrongCredentials = {
  email: 'dev.emailtest404@gmail.com',
  password: '12345678',
};

const user = {
  id: 1,
  username: 'developer',
  email: 'dev.emailtest404@gmail.com',
  password: '$2a$10$PvA1KB5pvQt9wQN3x9ugyeZpNM3JcLpgPtg6vBk9v91NBr0PxUYhO',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiInYWJjMTIzQUJDJyIsImlhdCI6MTY1NjE2MDg4MSwiZXhwIjoxNjU2MTY4MDgxfQ.LLZWJOYCSSvS2njDYlYZT_9J3LhN7Nj-BtypUhB0LkA';

const loginData = {
  user: {
    id: 1,
    username: 'developer',
    email: 'dev.emailtest404@gmail.com',
  },
  token,
};

describe('POST /api/login', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(user);

      sinon
        .stub(jwt, 'sign')
        .returns(token);
    });

    after(() => {
      User.findOne.restore();
      jwt.sign.restore();
    });

    it('login with valid credentials', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send(credentials);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
      expect(chaiHttpResponse.body).to.deep.equal(loginData);
    });
  });

  describe('- Invalid fields', () => {
    it('email not filled.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send({
          password: credentials.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('invalid email address.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send({
          email: 'dev.dev.com',
          password: credentials.password,
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Please provide a valid email adress' });
    });

    it('password not filled.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send({
          email: credentials.email,
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('password not big enough.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send({
          email: credentials.email,
          password: '1234',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: '"password" length must be equal or greater than 8' });
    });
  });

  describe('- Credentials do not match', () => {
    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(user);

      sinon
        .stub(bcrypt, 'compareSync')
        .returns(false);
    });

    after(() => {
      User.findOne.restore();
    });

    it('wrong email or password', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send(wrongCredentials);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .throws(error);
    });
    after(async () => {
      User.findOne.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/login')
        .send(credentials);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
