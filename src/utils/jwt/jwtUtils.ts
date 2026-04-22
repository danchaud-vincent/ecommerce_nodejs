import type { User } from '../../models/user';
import { jwtConfig } from '../../config/jwt';
import jwt, { type SignOptions } from 'jsonwebtoken';

export const generateAccessToken = (payload: {
  email: string;
  password: string;
}) => {
  return jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: jwtConfig.jwtExpiration as any,
  });
};

export const generateRefreshToken = (payload: {
  email: string;
  password: string;
}) => {
  return jwt.sign(payload, jwtConfig.jwtRefreshSecret, {
    expiresIn: jwtConfig.jwtRefreshExpiration as any,
  });
};
