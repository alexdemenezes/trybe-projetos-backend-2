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

const taskResult = {
  id: 1,
  title: 'finalizar projeto Trybe',
  description: '',
  status: 'pendente',
  userId: 1,
};

const tokenData = {
  email: 'dev.emailtest404@gmail.com',
  password: '12345678',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiInYWJjMTIzQUJDJyIsImlhdCI6MTY1NjE5MDUyNCwiZXhwIjoxNjU2MTk3NzI0fQ.ECen6x9zrHwL3oLRaskWei3oqUMIb1og1dn2bNKO47E';

describe('GET /api/tasks/:id', () => {
  describe('-Sucess.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(Task, 'findOne')
        .resolves(taskResult);

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      Task.findOne.restore();
      jwt.verify.restore();
    });

    it('find task by id', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks/1')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(taskResult);
    });
  });

  describe('- Not found.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(Task, 'findOne')
        .resolves(null);

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      Task.findOne.restore();
      jwt.verify.restore();
    });

    it('cannot find the task by the given id', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks/2222')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'task not found' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(Task, 'findOne')
        .throws(error);

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });
    after(async () => {
      Task.findOne.restore();
      jwt.verify.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks/3')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
