import MatchService from '../../services/MatchesService';
import MatchController from '../../controllers/MatchController';

export default class MatchFactory {
  public static create() {
    const matchService = new MatchService();
    const matchController = new MatchController(matchService);
    return matchController;
  }
}
