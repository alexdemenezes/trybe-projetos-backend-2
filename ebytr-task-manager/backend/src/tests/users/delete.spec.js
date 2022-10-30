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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiInYWJjMTIzQUJDJyIsImlhdCI6MTY1NjE5MDUyNCwiZXhwIjoxNjU2MTk3NzI0fQ.ECen6x9zrHwL3oLRaskWei3oqUMIb1og1dn2bNKO47E';

describe('DELETE /api/users', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(User, 'destroy')
        .resolves({ status: true });

      sinon
        .stub(jwt, 'verify')
        .returns({
          email: 'dev.emailtest404@gmail.com',
          password: "'abc123ABC'",
        });
    });

    after(() => {
      User.destroy.restore();
      jwt.verify.restore();
    });

    it('delete user account', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .delete('/api/users')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('- Unauthorized.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong');

    before(() => {
      sinon
        .stub(jwt, 'verify')
        .throws(error);
    });

    after(() => {
      jwt.verify.restore();
    });
    it('token not sent', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .delete('/api/users');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
    });

    it('token invalid or expired', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .delete('/api/users')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong');

    before(() => {
      sinon
        .stub(User, 'destroy')
        .throws(error);

      sinon
        .stub(jwt, 'verify')
        .returns({
          email: 'dev.emailtest404@gmail.com',
          password: '12345678',
        });
    });

    after(() => {
      User.destroy.restore();
      jwt.verify.restore();
    });

    it(' unexpected problem event', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .delete('/api/users')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
