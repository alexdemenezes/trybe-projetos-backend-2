import LeaderboardService from '../../services/LeaderboardService';
import LeaderboardController from '../../controllers/LeaderboardController';

export default class LeaderboardFactory {
  public static create() {
    const leaderboardService = new LeaderboardService();
    const leaderboardController = new LeaderboardController(leaderboardService);
    return leaderboardController;
  }
}
