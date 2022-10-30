import Teams from '../../database/models/TeamsModel';

export default interface ITeamService {
  getAll(): Promise<Teams[]>;
  getById(id: number): Promise<Teams | null>;
}
