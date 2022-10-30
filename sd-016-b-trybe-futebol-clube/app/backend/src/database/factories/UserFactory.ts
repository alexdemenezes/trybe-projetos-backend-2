import UserService from '../../services/UserService';
import UserControler from '../../controllers/UserController';

export default class Userfactory {
  public static create() {
    const userService = new UserService();
    const userController = new UserControler(userService);

    return userController;
  }
}
