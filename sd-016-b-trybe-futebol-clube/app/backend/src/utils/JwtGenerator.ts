import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Secret, SignOptions } from 'jsonwebtoken';

export default class JwtGenerator {
  private _SECRET: Secret;
  private _jwtConfig: SignOptions;

  constructor() {
    this._jwtConfig = {
      expiresIn: '60 min',
      algorithm: 'HS256',
    };
    this._SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  }

  public generateToken(email: string, password: string): string {
    const data = {
      email,
      password,
    };

    const token = jwt.sign(data, this._SECRET, this._jwtConfig);
    return token;
  }
}
