import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';
import { Stock } from './stock';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductCreationAttributes extends Omit<
  ProductAttributes,
  'id'
> {}

export type ProductUpdateAttributes = Partial<Omit<ProductAttributes, 'id'>>;

export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  declare id: number;
  declare name: string;
  declare price: number;
  declare description: string;
  declare imageUrl: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'products', timestamps: true },
);

Product.addHook('afterCreate', async (product: Product) => {
  await Stock.create({ productId: product.id, quantity: 0 });
});
