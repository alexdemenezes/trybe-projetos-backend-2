import ILeaderBoard from '../../database/entities/interfaces/ILeaderboard';

type LeaderboardsType = [
  leaderboarHomeFormat: ILeaderBoard[],
  leaderboarAwayFormat: ILeaderBoard[],
  leaderboarFormat: ILeaderBoard[],
];

export default LeaderboardsType;
