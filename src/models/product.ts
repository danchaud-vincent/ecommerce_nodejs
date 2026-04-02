import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../database/db';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  'id'
> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  imageUrl!: string;
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
  { sequelize, tableName: 'products' },
);
