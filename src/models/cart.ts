import {
  DataTypes,
  Model,
  type BelongsToManyAddAssociationMixin,
} from 'sequelize';
import { sequelize } from '../database/sequelize';
import type { Product } from './product';

interface CartAttributes {
  id: number;
  userId: number;
}

interface CartCreationAttributes extends Omit<CartAttributes, 'id'> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  declare id: number;
  declare userId: number;

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'carts', timestamps: true },
);
