import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface CartProductAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export class CartProduct
  extends Model<CartProductAttributes>
  implements CartProductAttributes
{
  declare id: number;
  declare cartId: number;
  declare productId: number;
  declare quantity: number;
}

CartProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { sequelize, tableName: 'cart_products', timestamps: true },
);
