// import Matches from '../../database/models/MatchesModel';
import LeaderboardsType from '../types/LeaderboardsType';
import { matchTeam } from '../types/matchType';

export default interface ILeaderboardService {
  generateLeaderboardFormat(): Promise<void>;
  getLeaderboard(): Promise<LeaderboardsType>;
  verifyScore(match: matchTeam): void
  teamHomeDraw(match: matchTeam): void
  teamHomeWinner(match: matchTeam): void
  teamHomeLost(match: matchTeam): void
  teamAwayDraw(match: matchTeam): void
  teamAwayWinner(match: matchTeam):void
  teamAwayLost(match: matchTeam): void
}
