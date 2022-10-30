import User from '../../database/entities/User';
import LoginType from '../types/loginType';

export default interface IUserService {
  login(email: string, passwordL: string): Promise<LoginType | null>;
  getUserByEmail(email: string): Promise<User | null>
}
