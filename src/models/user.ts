import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  token: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'token'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare email: string;
  declare password: string;
  declare token: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
);
