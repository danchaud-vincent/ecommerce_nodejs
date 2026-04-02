import { dbConfig } from '../config/db';
import { Sequelize } from 'sequelize';
import { Product } from '../models/product';
import { Stock } from '../models/stock';

function setDatabaseAssociations() {
  Product.hasOne(Stock, { foreignKey: 'productId', as: 'stock' });
  Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
}

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

    setDatabaseAssociations();

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database', error);
    throw error;
  }
};
