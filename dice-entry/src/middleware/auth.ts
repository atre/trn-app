import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth';

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const user = AuthService.validateToken(token) as { userId: number; nickname: string };
    req.user = user;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
}
