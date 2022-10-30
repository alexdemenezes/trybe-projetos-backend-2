/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const App = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

const { expect } = chai;

const userResult = {
  id: 1,
  username: 'developer',
  email: 'dev.emailtest404@gmail.com',
  password: '',
};

const userDb = {
  id: 1,
  username: 'developer',
  email: 'dev.emailtest404@gmail.com',
  password: '$2a$10$PvA1KB5pvQt9wQN3x9ugyeZpNM3JcLpgPtg6vBk9v91NBr0PxUYhO',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiInYWJjMTIzQUJDJyIsImlhdCI6MTY1NjE5MDUyNCwiZXhwIjoxNjU2MTk3NzI0fQ.ECen6x9zrHwL3oLRaskWei3oqUMIb1og1dn2bNKO47E';

describe('GET /api/users/:id', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(userDb);

      sinon
        .stub(jwt, 'verify')
        .returns({
          email: 'dev.emailtest404@gmail.com',
          password: "'abc123ABC'",
        });
    });

    after(() => {
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('find user by id', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/users/1')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(userResult);
    });
  });

  describe('- Not found.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'findOne')
        .resolves(null);

      sinon
        .stub(jwt, 'verify')
        .returns({
          email: 'dev.emailtest404@gmail.com',
          password: "'abc123ABC'",
        });
    });

    after(() => {
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('cannot find the user by the given id', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/users/270')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'user not found' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(User, 'findOne')
        .throws(error);

      sinon
        .stub(jwt, 'verify')
        .returns({
          email: 'dev.emailtest404@gmail.com',
          password: "'abc123ABC'",
        });
    });
    after(async () => {
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/users/100')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
