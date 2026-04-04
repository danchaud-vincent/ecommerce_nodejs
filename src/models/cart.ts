import {
  DataTypes,
  Model,
  type BelongsToManyAddAssociationMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import type { Product } from './product';

interface CartAttributes {
  id: number;
}

export class Cart extends Model<CartAttributes> implements CartAttributes {
  declare id: number;

  declare addItem: BelongsToManyAddAssociationMixin<Product, number>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  { sequelize, tableName: 'carts', timestamps: true },
);
