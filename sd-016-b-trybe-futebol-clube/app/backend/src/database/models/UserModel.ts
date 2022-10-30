import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Users extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  timestamps: false,
  underscored: false,
  sequelize: db,
  modelName: 'users',
});
