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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi5lbWFpbHRlc3Q0MDRAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsImlhdCI6MTY1NjI1MTI0MiwiZXhwIjoxNjU2MjU4NDQyfQ.cEniJXplXgrmXyqADIdXWkbvSmMg-T4SUT0rnyvbIng';
const tokenData = {
  email: 'dev.emailtest404@gmail.com',
  password: '12345678',
};

const user = { id: 1 };

const tasks = [
  {
    id: 1,
    title: 'finalizar projeto Trybe',
    description: '',
    status: 'pendente',
    userId: 1,
  },
  {
    id: 2,
    title: 'estudar JS',
    description: 'estudar javascript este final de semana',
    status: 'pendente',
    userId: 1,
  },
  {
    id: 3,
    title: 'correr domingo',
    description: 'correr 10 km no parque do ibira',
    status: 'pendente',
    userId: 1,
  },
];

describe('GET /api/tasks', () => {
  describe('- Success.', () => {
    let chaiHttpResponse;

    before(() => {
      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);

      sinon
        .stub(User, 'findOne')
        .resolves(user);

      sinon
        .stub(Task, 'findAll')
        .resolves(tasks);
    });

    after(() => {
      jwt.verify.restore();
      User.findOne.restore();
      Task.findAll.restore();
    });

    it('get all tasks made by the user', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(tasks);
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
        .get('/api/tasks');

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Authorization token is required' });
    });

    it('token invalid or expired', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token is invalid or expired' });
    });
  });
  describe('- Internal error.', () => {
    let chaiHttpResponse;
    const error = new Error('something went wrong...');
    before(async () => {
      sinon
        .stub(Task, 'findAll')
        .throws(error);

      sinon
        .stub(User, 'findOne')
        .resolves({ id: 1 });

      sinon
        .stub(jwt, 'verify')
        .returns(tokenData);
    });
    after(async () => {
      Task.findAll.restore();
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('unexpected problem event.', async () => {
      chaiHttpResponse = await chai
        .request(App.app)
        .get('/api/tasks')
        .set('authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'internal error' });
    });
  });
});
