import jwt from 'jsonwebtoken';
import { config } from '../config';

export class AuthService {
  static validateToken(token: string) {
    return jwt.verify(token, config.auth.secret);
  }
}
