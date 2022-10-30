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

describe('PATCH /api/users', () => {
  describe('update /username', () => {
    describe('- Success.', () => {
      let chaiHttpResponse;

      before(() => {
        sinon
          .stub(User, 'update')
          .resolves({ status: true });

        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('username updated', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/username')
          .set('authorization', token)
          .send({ username: 'developer1' });

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
          .patch('/api/users/username')
          .send({ username: 'developer1' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
      });

      it('token invalid or expired', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/username')
          .set('authorization', token)
          .send({ username: 'developer1' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
      });
    });

    describe('- Invalid fields.', () => {
      before(() => {
        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        jwt.verify.restore();
      });

      it('username not filled.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/username')
          .set('authorization', token)
          .send({});

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('username not big enough.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/username')
          .set('authorization', token)
          .send({ username: 'dev' });

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: '"username" length must be equal or greater than 6' });
      });
    });

    describe('- Internal error.', () => {
      let chaiHttpResponse;
      const error = new Error('something went wrong...');
      before(async () => {
        sinon
          .stub(User, 'update')
          .throws(error);

        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });
      after(async () => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('unexpected problem event.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/username')
          .set('authorization', token)
          .send({ username: 'developer1' });

        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
      });
    });
  });

  describe('update /email', () => {
    describe('- Success.', () => {
      let chaiHttpResponse;

      before(() => {
        sinon
          .stub(User, 'update')
          .resolves({ status: true });

        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('username updated', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/email')
          .set('authorization', token)
          .send({ email: 'dev@gmail.com' });

        expect(chaiHttpResponse.status).to.be.equal(200);
      });
    });

    describe('- Unauthorized', () => {
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
          .patch('/api/users/email')
          .send({ email: 'dev@gmail.com' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
      });

      it('token invalid or expired', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/email')
          .set('authorization', token)
          .send({ email: 'dev@gmail.com' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
      });
    });

    describe('- Invalid fields', () => {
      before(() => {
        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        jwt.verify.restore();
      });

      it('email not filled.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/email')
          .set('authorization', token)
          .send({});

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('email not valid.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/email')
          .set('authorization', token)
          .send({ email: 'devgmail.com' });

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Please provide a valid email adress' });
      });
    });

    describe('- Internal error.', () => {
      let chaiHttpResponse;
      const error = new Error('something went wrong...');
      before(async () => {
        sinon
          .stub(User, 'update')
          .throws(error);

        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });
      after(async () => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('unexpected problem event.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/email')
          .set('authorization', token)
          .send({ email: 'dev@gmail.com' });

        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
      });
    });
  });

  describe('update /password', () => {
    describe('- Success.', () => {
      let chaiHttpResponse;

      before(() => {
        sinon
          .stub(User, 'update')
          .returns({ status: true });

        sinon
          .stub(jwt, 'verify')
          .resolves({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('password updated', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/password')
          .set('authorization', token)
          .send({ password: '12345678' });

        expect(chaiHttpResponse.status).to.be.equal(200);
      });
    });

    describe('- Unauthorized', () => {
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
          .patch('/api/users/password')
          .send({ password: '12345678' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
      });

      it('token invalid or expired', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/password')
          .set('authorization', token)
          .send({ password: '12345678' });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
      });
    });

    describe('- Invalid fields', () => {
      before(() => {
        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });

      after(() => {
        jwt.verify.restore();
      });

      it('password not filled.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/password')
          .set('authorization', token)
          .send({});

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('password not big enough.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/password')
          .set('authorization', token)
          .send({ password: '12345' });

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: '"password" length must be equal or greater than 8' });
      });
    });

    describe('- Internal error.', () => {
      let chaiHttpResponse;
      const error = new Error('something went wrong...');
      before(async () => {
        sinon
          .stub(User, 'update')
          .throws(error);

        sinon
          .stub(jwt, 'verify')
          .returns({
            email: 'dev.emailtest404@gmail.com',
            password: "'abc123ABC'",
          });
      });
      after(async () => {
        User.update.restore();
        jwt.verify.restore();
      });

      it('unexpected problem event.', async () => {
        chaiHttpResponse = await chai
          .request(App.app)
          .patch('/api/users/password')
          .set('authorization', token)
          .send({ password: '12345678' });

        expect(chaiHttpResponse.status).to.be.equal(500);
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
      });
    });
  });
});
