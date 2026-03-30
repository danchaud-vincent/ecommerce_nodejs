import { config } from 'dotenv';

config();

export const dbConfig = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
};
