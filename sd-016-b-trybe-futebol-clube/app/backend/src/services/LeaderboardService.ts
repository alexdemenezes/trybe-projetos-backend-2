import ILeaderboard from '../database/entities/interfaces/ILeaderboard';
import ILeaderboardService from './interfaces/ILeaderboardService';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import LeaderboardsType from './types/LeaderboardsType';
import { matchTeam } from './types/matchType';

export default class LeaderboardService implements ILeaderboardService {
  private static _TeamsModel = Teams;
  private static _MatchesModel = Matches;
  private _teams: Teams[];
  private _matches: Matches[];
  public leaderboardHomeFormat: ILeaderboard[] = [];
  public leaderboardAwayFormat: ILeaderboard[] = [];
  public leaderboardFormat: ILeaderboard[] = [];
  public result: ILeaderboard[];

  public async generateLeaderboardFormat(): Promise<void> {
    this._teams = await LeaderboardService._TeamsModel.findAll({ raw: true });
    this._teams.forEach((team) => {
      const format = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
      this.leaderboardHomeFormat.push(format);
      this.leaderboardFormat.push(format);
      this.leaderboardAwayFormat.push(format);
    });
  }

  public teamHomeWinner(match: matchTeam): void {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === homeTeam);

    const index = this.leaderboardHomeFormat.findIndex((t) => t.name === teamName);
    const teamH = this.leaderboardHomeFormat[index];

    this.leaderboardHomeFormat[index] = {
      name: teamName,
      totalPoints: teamH.totalPoints + 3,
      totalGames: teamH.totalGames + 1,
      totalVictories: teamH.totalVictories + 1,
      totalDraws: teamH.totalDraws,
      totalLosses: teamH.totalLosses,
      goalsFavor: teamH.goalsFavor + homeTeamGoals,
      goalsOwn: teamH.goalsOwn + awayTeamGoals,
      goalsBalance: teamH.goalsBalance + homeTeamGoals - awayTeamGoals,
      efficiency: +(((teamH.totalPoints + 3) / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public teamAwayWinner(match: matchTeam): void {
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === awayTeam);

    const index = this.leaderboardAwayFormat.findIndex((t) => t.name === teamName);
    const teamA = this.leaderboardAwayFormat[index];

    this.leaderboardAwayFormat[index] = {
      name: teamName,
      totalPoints: teamA.totalPoints + 3,
      totalGames: teamA.totalGames + 1,
      totalVictories: teamA.totalVictories + 1,
      totalDraws: teamA.totalDraws,
      totalLosses: teamA.totalLosses,
      goalsFavor: teamA.goalsFavor + awayTeamGoals,
      goalsOwn: teamA.goalsOwn + homeTeamGoals,
      goalsBalance: teamA.goalsBalance + awayTeamGoals - homeTeamGoals,
      efficiency: +(((teamA.totalPoints + 3) / ((teamA.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public teamHomeDraw(match: matchTeam):void {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === homeTeam);

    const index = this.leaderboardHomeFormat.findIndex((t) => t.name === teamName);
    const teamH = this.leaderboardHomeFormat[index];

    this.leaderboardHomeFormat[index] = {
      name: teamName,
      totalPoints: teamH.totalPoints + 1,
      totalGames: teamH.totalGames + 1,
      totalVictories: teamH.totalVictories,
      totalDraws: teamH.totalDraws + 1,
      totalLosses: teamH.totalLosses,
      goalsFavor: teamH.goalsFavor + homeTeamGoals,
      goalsOwn: teamH.goalsOwn + awayTeamGoals,
      goalsBalance: teamH.goalsBalance + (homeTeamGoals - awayTeamGoals),
      efficiency: +(((teamH.totalPoints + 1) / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public teamAwayDraw(match: matchTeam): void {
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === awayTeam);

    const index = this.leaderboardAwayFormat.findIndex((t) => t.name === teamName);
    const teamA = this.leaderboardAwayFormat[index];

    this.leaderboardAwayFormat[index] = {
      name: teamName,
      totalPoints: teamA.totalPoints + 1,
      totalGames: teamA.totalGames + 1,
      totalVictories: teamA.totalVictories,
      totalDraws: teamA.totalDraws + 1,
      totalLosses: teamA.totalLosses,
      goalsFavor: teamA.goalsFavor + awayTeamGoals,
      goalsOwn: teamA.goalsOwn + homeTeamGoals,
      goalsBalance: teamA.goalsBalance + (awayTeamGoals - homeTeamGoals),
      efficiency: +(((teamA.totalPoints + 1) / ((teamA.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public teamHomeLost(match: matchTeam): void {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === homeTeam);

    const index = this.leaderboardHomeFormat.findIndex((t) => t.name === teamName);
    const teamH = this.leaderboardHomeFormat[index];

    this.leaderboardHomeFormat[index] = {
      name: teamName,
      totalPoints: teamH.totalPoints,
      totalGames: teamH.totalGames + 1,
      totalVictories: teamH.totalVictories,
      totalDraws: teamH.totalDraws,
      totalLosses: teamH.totalLosses + 1,
      goalsFavor: teamH.goalsFavor + homeTeamGoals,
      goalsOwn: teamH.goalsOwn + awayTeamGoals,
      goalsBalance: teamH.goalsBalance + homeTeamGoals - awayTeamGoals,
      efficiency: +((teamH.totalPoints / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public teamAwayLost(match: matchTeam): void {
    const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const [{ teamName }] = this._teams.filter((team) => team.id === awayTeam);

    const index = this.leaderboardAwayFormat.findIndex((t) => t.name === teamName);
    const teamH = this.leaderboardAwayFormat[index];

    this.leaderboardAwayFormat[index] = {
      name: teamName,
      totalPoints: teamH.totalPoints,
      totalGames: teamH.totalGames + 1,
      totalVictories: teamH.totalVictories,
      totalDraws: teamH.totalDraws,
      totalLosses: teamH.totalLosses + 1,
      goalsFavor: teamH.goalsFavor + awayTeamGoals,
      goalsOwn: teamH.goalsOwn + homeTeamGoals,
      goalsBalance: teamH.goalsBalance + awayTeamGoals - homeTeamGoals,
      efficiency: +((teamH.totalPoints / ((teamH.totalGames + 1) * 3)) * 100).toFixed(2),
    };
  }

  public verifyScore(match: matchTeam): void {
    const [{ teamName }] = this._teams.filter((team) => team.id === match.homeTeam);
    console.log(teamName);

    console.log('team:', match.homeTeam);
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      this.teamHomeWinner(match);
      this.teamAwayLost(match);
    } else if (homeTeamGoals === awayTeamGoals) {
      this.teamHomeDraw(match);
      this.teamAwayDraw(match);
    } else if (homeTeamGoals < awayTeamGoals) {
      this.teamHomeLost(match);
      this.teamAwayWinner(match);
    }
  }

  public getFullLeaderboard(): void {
    const t = this._teams.length;
    const h = this.leaderboardHomeFormat;
    const a = this.leaderboardAwayFormat;

    for (let i = 0; i < t; i += 1) {
      this.leaderboardFormat[i] = {
        name: h[i].name,
        totalPoints: h[i].totalPoints + a[i].totalPoints,
        totalGames: h[i].totalGames + a[i].totalGames,
        totalVictories: h[i].totalVictories + a[i].totalVictories,
        totalDraws: h[i].totalDraws + a[i].totalDraws,
        totalLosses: h[i].totalLosses + a[i].totalLosses,
        goalsFavor: h[i].goalsFavor + a[i].goalsFavor,
        goalsOwn: h[i].goalsOwn + a[i].goalsOwn,
        goalsBalance: (h[i].goalsFavor + a[i].goalsFavor) - (h[i].goalsOwn + a[i].goalsOwn),
        efficiency: +(((h[i].totalPoints + a[i].totalPoints)
        / ((h[i].totalGames + a[i].totalGames) * 3)) * 100).toFixed(2),
      };
    }
  }

  // correcao do sort com a dica do Nato - o sort anterior se sobrescrevia.
  public orderArr(arr: ILeaderboard[]): ILeaderboard[] {
    this.result = arr.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return this.result;
  }

  public async getLeaderboard(): Promise<LeaderboardsType> {
    await this.generateLeaderboardFormat();
    this._matches = await LeaderboardService._MatchesModel.findAll({
      raw: true,
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }] });
    this._matches.filter((match) => !match.inProgress)
      .map((match) => this.verifyScore(match as matchTeam));
    this.getFullLeaderboard();
    const leaderboardH = this.orderArr(this.leaderboardHomeFormat);
    const leaderboardA = this.orderArr(this.leaderboardAwayFormat);
    const leaderboard = this.orderArr(this.leaderboardFormat);
    this.leaderboardHomeFormat = [];
    this.leaderboardAwayFormat = [];
    this.leaderboardFormat = [];
    return [leaderboardH, leaderboardA, leaderboard];
  }
}
