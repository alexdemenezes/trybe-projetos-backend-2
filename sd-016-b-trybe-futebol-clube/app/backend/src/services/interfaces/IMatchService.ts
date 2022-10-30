import Matches from '../../database/models/MatchesModel';
import Match from '../../database/entities/Match';

export default interface IMatches {
  getAll(): Promise<Matches[]>;
  getAllByProgress(inProgress: boolean): Promise<Matches[]>;
  getById(id:number): Promise<Match | null>
  create(Matches: Match): Promise<Match | null>;
  updateProgress(id: number): Promise<string | null>
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<string | null>
}
