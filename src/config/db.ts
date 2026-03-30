import { config } from 'dotenv';

config();

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const dbConfig = {
  username: getEnv('USERNAME'),
  password: getEnv('PASSWORD'),
  database: getEnv('DATABASE'),
  host: getEnv('HOST'),
};
