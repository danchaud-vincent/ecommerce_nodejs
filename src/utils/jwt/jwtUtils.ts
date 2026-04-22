import jwt, { type SignOptions } from 'jsonwebtoken';
import type { User } from '../../models/user';
import { jwtConfig } from '../../config/jwt';

export class JwtUtils {
  static generateToken(user: User) {}

  static verifyToken(token: string) {}
}
