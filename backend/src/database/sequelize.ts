import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db';

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { dialect: 'mysql', host: dbConfig.host },
);
