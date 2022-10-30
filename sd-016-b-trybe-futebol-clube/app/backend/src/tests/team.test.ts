import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import { before, after } from 'mocha';

import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;
const teams = [
	{
		id: 1,
		teamName: 'Avaí/Kindermann',
	},
	{
		id: 2,
		teamName: 'Bahia',
	},
	{
		id: 3,
		teamName: 'Botafogo',
	},
];

const team = {
		id: 2,
		teamName: 'Bahia',
	};

describe('/teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teams as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('É possível devolver todos os times corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');

  });
});

describe('/teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(team as Teams);
  });

  after(()=>{
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('É possível devolver um time específico', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/2');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});
