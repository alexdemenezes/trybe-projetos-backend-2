import ITeam from '../interfaces/ITeam';

export default class Team implements ITeam {
  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
