import Matches from '../../database/models/MatchesModel';

export type matchTeam = Matches & {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
};
