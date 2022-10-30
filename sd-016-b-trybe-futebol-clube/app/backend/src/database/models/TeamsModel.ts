import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

export default class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  timestamps: false,
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
