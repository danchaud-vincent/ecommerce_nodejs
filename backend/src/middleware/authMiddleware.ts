import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt/jwtUtils';
import type { User } from '../models/user';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1] as string;

  try {
    const decoded = verifyAccessToken(token) as User;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
