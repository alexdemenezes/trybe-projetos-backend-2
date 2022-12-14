import { Request, Response } from 'express';
import IMatch from './interfaces/IMatchController';
import IMatchService from '../services/interfaces/IMatchService';
import Match from '../database/entities/Match';
import TeamService from '../services/TeamService';

export default class MatchController implements IMatch {
  private _MatchService: IMatchService;
  private _MESSAGE_INTERNAL_ERROR = { message: 'internal error!' };

  constructor(matcheService: IMatchService) {
    this._MatchService = matcheService;
  }

  public async getAll(req:Request, res: Response): Promise<Response> {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        const boolean = inProgress === 'true';
        const matches = await this._MatchService.getAllByProgress(boolean);
        if (matches) {
          return res.status(200).json(matches);
        }
      } else {
        const matches = await this._MatchService.getAll();
        if (matches) {
          return res.status(200).json(matches);
        }
      }
      return res.status(404).json({ message: 'not found!' });
    } catch (e) {
      return res.status(500).json(this._MESSAGE_INTERNAL_ERROR);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
      const teamService = new TeamService();
      const _homeTeam = await teamService.getById(+homeTeam);
      const _awayTeam = await teamService.getById(+awayTeam);
      if (_homeTeam && _awayTeam) {
        const match = new Match({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
        const newMatch = await this._MatchService.create(match);
        if (newMatch) {
          return res.status(201).json(newMatch);
        }
        return res.status(401).json({
          message: 'It is not possible to create a match with two equal teams' });
      }
      return res.status(404).json({ message: 'There is no team with such id!' });
    } catch (e) {
      return res.status(500).json(this._MESSAGE_INTERNAL_ERROR);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      if (!homeTeamGoals && !awayTeamGoals) {
        await this._MatchService.updateProgress(+id);
        return res.status(200).json({ message: 'success' });
      }

      const result = await this._MatchService.update(+id, +homeTeamGoals, +awayTeamGoals);
      if (!result) {
        return res.status(401).json({ message: 'ops! something went wrong :(' });
      }
      return res.status(200).json({ message: 'updated' });
    } catch (e) {
      return res.status(500).json(this._MESSAGE_INTERNAL_ERROR);
    }
  }

  public async updateProgress(req:Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await this._MatchService.updateProgress(+id);
      if (!result) {
        return res.status(401).json({ message: ' ops! something went wrong :(' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (e) {
      return res.status(500).json(this._MESSAGE_INTERNAL_ERROR);
    }
  }
}
