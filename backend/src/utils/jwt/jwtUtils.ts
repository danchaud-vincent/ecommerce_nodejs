import type { User } from '../../models/user';
import { jwtConfig } from '../../config/jwt';
import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';

export const generateAccessToken = (payload: {
  email: string;
  password: string;
}): string => {
  return jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: jwtConfig.jwtExpiration as any,
  });
};

export const generateRefreshToken = (payload: {
  email: string;
  password: string;
}): string => {
  return jwt.sign(payload, jwtConfig.jwtRefreshSecret, {
    expiresIn: jwtConfig.jwtRefreshExpiration as any,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtConfig.jwtSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtConfig.jwtRefreshSecret) as JwtPayload;
};
