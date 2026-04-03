import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface StockAttributes {
  id: number;
  productId: number;
  quantity: number;
}

export interface StockCreationAttributes extends Omit<StockAttributes, 'id'> {}

export class Stock
  extends Model<StockAttributes, StockCreationAttributes>
  implements StockAttributes
{
  declare id: number;
  declare productId: number;
  declare quantity: number;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize, tableName: 'stocks', timestamps: true },
);
