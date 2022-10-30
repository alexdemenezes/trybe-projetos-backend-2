import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import  chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { before, after } from 'mocha';
import UserModel from '../database/models/UserModel';
import * as Jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjU1ODM2NDMyLCJleHAiOjE2NTU4NDAwMzJ9.w3nJzXChWUjjBn8NrkDoLn-WS7tGnMDuL00pETL8KT0'

describe('/login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      } as UserModel);

      sinon
      .stub(Jwt, "sign")
      .resolves(token);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
    (Jwt.sign as sinon.SinonStub).restore();
  });

  it('login success', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });


  it('failed login', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "developer@gmail.com",
        password: "12345678"
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('empty field', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: "developer@gmail.com"
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.equal("All fields must be filled");
  });
});


describe('/login/validate', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      } as UserModel);

    sinon
      .stub(Jwt, "verify")
      .resolves({
        email: "admin@admin.com",
        password: "secret_admin"
      });
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
    (Jwt.verify as sinon.SinonStub).restore();
  })

  it('Busca o role com sucesso!', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.equal('admin');
  });
});


