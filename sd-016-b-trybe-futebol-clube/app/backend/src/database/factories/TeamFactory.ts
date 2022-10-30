import TeamService from '../../services/TeamService';
import TeamController from '../../controllers/TeamController';

export default class TeamFactory {
  public static create() {
    const teamService = new TeamService();
    const teamController = new TeamController(teamService);
    return teamController;
  }
}
