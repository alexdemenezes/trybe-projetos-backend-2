/* eslint-disable no-undef */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const Task = require('../../models/Task');
const App = require('../../app');
const User = require('../../models/User');

chai.use(chaiHttp);

const { expect } = chai;

const newTask = {
  title: 'fix register user bug',
  description: 'need to fix register user bug before monday.',
  status: 'pendente',
};

const taskCreated = {
  id: 1,
  title: 'fix register user bug',
  description: 'need to fix register user bug before monday.',
  status: 'pendente',
  userId: 1,
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjI1MTI0MiwiZXhwIjoxNjU2MjU4NDQyfQ.cEniJXplXgrmXyqADIdXWkbvSmMg-T4SUT0rnyvbIng';
const tokenData = {
  email: 'dev.emailtest404@gmail.com',
  password: '12345678',
};

describe('POST /api/tasks', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(Task, 'create')
        .resolves({ id: 1 });

      sinon
        .stub(User, 'findOne')
        .resolves({ id: 1 });

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      Task.create.restore();
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('create new task', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks')
        .set('authorization', token)
        .send(newTask);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(taskCreated);
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
        .post('/api/tasks');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
    });

    it('token invalid or expired', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
    });
  });

  describe('- Invalid fields', () => {
    before(() => {
      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });

    after(() => {
      jwt.verify.restore();
    });

    let chaiHttpResponse;
    it('title not filled', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks')
        .set('authorization', token)
        .send({
          description: 'test',
          status: 'pendente',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'title field must be filled' });
    });

    it('status not filled', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks')
        .set('authorization', token)
        .send({
          title: 'test',
          description: '',
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'status field must be filled' });
    });
  });

  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(Task, 'create')
        .throws(error);

      sinon
        .stub(User, 'findOne')
        .resolves({ id: 1 });

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });
    after(async () => {
      Task.create.restore();
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .post('/api/tasks')
        .set('authorization', token)
        .send(newTask);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
