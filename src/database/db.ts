import { Product } from '../models/product';
import { Stock } from '../models/stock';
import { sequelize } from './sequelize';

function setDatabaseAssociations() {
  Product.hasOne(Stock, { foreignKey: 'productId', as: 'stock' });
  Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
}

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
