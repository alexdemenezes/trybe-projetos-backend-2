import { Request, Response } from 'express';
import ITeamService from '../services/interfaces/ITeamService';
import ITeamController from './interfaces/ITeamController';

export default class TeamController implements ITeamController {
  private _TeamService: ITeamService;

  constructor(teamService: ITeamService) {
    this._TeamService = teamService;
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const teams = await this._TeamService.getAll();
      return res.status(200).json(teams);
    } catch (e) {
      return res.status(500).json({ message: 'internal error!' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const team = await this._TeamService.getById(+id);
      if (team) {
        return res.status(200).json(team);
      }
      return res.status(404).json({ message: 'user not found!' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error!' });
    }
  }
}
