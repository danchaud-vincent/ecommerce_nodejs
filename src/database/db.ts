import { dbConfig } from '../config/db';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { dialect: 'mysql', host: dbConfig.host },
);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');

    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
    throw error;
  }
};
