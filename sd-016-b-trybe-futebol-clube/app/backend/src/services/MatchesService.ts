import Matches from '../database/models/MatchesModel';
import IMatches from './interfaces/IMatchService';
import Teams from '../database/models/TeamsModel';
import Match from '../database/entities/Match';

export default class MatchesService implements IMatches {
  private static _MatchesModel = Matches;
  private _matches: Matches[];
  private _match: Matches;
  private _inProgress: boolean;
  private _updated: boolean;
  private _id: number;

  public async getAll(): Promise<Matches[]> {
    this._matches = await MatchesService._MatchesModel.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return this._matches;
  }

  public async getAllByProgress(inProgress: boolean): Promise<Matches[]> {
    this._matches = await MatchesService._MatchesModel.findAll({
      where: {
        inProgress,
      },
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return this._matches;
  }

  public async getById(id: number): Promise<Match | null> {
    this._id = id;
    const match = await MatchesService._MatchesModel.findByPk(id);
    if (match) {
      return match;
    }
    return null;
  }

  public async create(match: Match): Promise<Match | null> {
    if (match.awayTeam === match.homeTeam) {
      return null;
    }

    this._match = await MatchesService._MatchesModel.create({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
    });

    return this._match;
  }

  public async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<string | null> {
    this._updated = true;

    const updated = await MatchesService._MatchesModel.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: {
        id,
      },
    });
    if (updated) {
      return 'success';
    }
    return null;
  }

  public async updateProgress(id: number): Promise<string | null> {
    this._inProgress = false;
    const updated = await MatchesService._MatchesModel.update(
      {
        inProgress: false,
      },
      {
        where: {
          id,
        },
      },
    );

    if (!updated) {
      return null;
    }

    return 'success';
  }
}
