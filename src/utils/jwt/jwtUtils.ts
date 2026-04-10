import jwt, { type SignOptions } from 'jsonwebtoken';
import type { User } from '../../models/user';
import { jwtConfig } from '../../config/jwt';

export class JwtUtils {
  static generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn as any,
    });
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error: any) {
      console.error(error.message);
      throw new Error('Invalid token.');
    }
  }
}
