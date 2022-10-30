/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const App = require('../../app');
const Task = require('../../models/Task');

chai.use(chaiHttp);

const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiInYWJjMTIzQUJDJyIsImlhdCI6MTY1NjE5MDUyNCwiZXhwIjoxNjU2MTk3NzI0fQ.ECen6x9zrHwL3oLRaskWei3oqUMIb1og1dn2bNKO47E';

const tokenData = {
  email: 'dev.emailtest404@gmail.com',
  password: '12345678',
};

const task = {
  id: 1,
  title: 'finalizar projeto Udemy',
  description: '',
  status: 'pendente',
};

describe('POST /api/tasks/update', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(Task, 'update')
        .resolves({ status: true });

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      Task.update.restore();
      jwt.verify.restore();
    });

    it('updated task', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks/update')
        .set('authorization', token)
        .send(task);

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
        .post('/api/tasks/update');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
    });

    it('token invalid or expired', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks/update')
        .set('authorization', token)
        .send(task);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong');

    before(() => {
      sinon
        .stub(Task, 'update')
        .throws(error);

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      Task.update.restore();
      jwt.verify.restore();
    });

    it(' unexpected problem event', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks/update')
        .set('authorization', token)
        .send(task);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
