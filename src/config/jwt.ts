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
  secret: getEnv('JWT_SECRET') as string,
  expiresIn: getEnv('JWT_EXPIRES_IN') as string,
};
