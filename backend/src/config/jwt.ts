import { config } from 'dotenv';

config();

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const jwtConfig = {
  jwtSecret: getEnv('JWT_SECRET') as string,
  jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET') as string,
  jwtExpiration: getEnv('JWT_EXPIRATION') as string,
  jwtRefreshExpiration: getEnv('JWT_REFRESH_EXPIRATION') as string,
};
