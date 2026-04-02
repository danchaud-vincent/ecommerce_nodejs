import { Model } from 'sequelize';
import { sequelize } from '../database/db';

interface StockAttributes {
  id: number;
  productId: number;
  quantity: number;
}

export class Stock extends Model<StockAttributes> implements StockAttributes {
  id!: number;
  productId!: number;
  quantity!: number;
}

Stock.init(
  {
    id: {
      type: 'INTEGER',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    productId: {
      type: 'INTEGER',
      allowNull: false,
    },
    quantity: {
      type: 'INTEGER',
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize, tableName: 'stocks', timestamps: true },
);
