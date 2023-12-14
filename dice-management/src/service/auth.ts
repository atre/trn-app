import crypto from 'crypto';
import util from 'util';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const scryptAsync = util.promisify(crypto.scrypt) as (password: string | Buffer, salt: string | Buffer, keylen: number) => Promise<Buffer>;

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    const [salt, key] = hash.split(':');
    const derivedKey = await scryptAsync(password, salt, 64);
    return key === derivedKey.toString('hex');
  }

  static generateToken(userId: number, nickname: string): string {
    return jwt.sign({ userId, nickname }, config.auth.secret, { expiresIn: '24h' });
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, config.auth.secret);
  }
}
