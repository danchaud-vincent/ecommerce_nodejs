import { Cart } from '../models/cart';
import { CartProduct } from '../models/cartProduct';
import { Product } from '../models/product';
import { Stock } from '../models/stock';
import { User } from '../models/user';
import { sequelize } from './sequelize';

function setDatabaseAssociations() {
  // Association between User and Cart
  User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
  Cart.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

  // Association between product and Stock
  Product.hasOne(Stock, { foreignKey: 'productId', as: 'inventory' });
  Stock.belongsTo(Product, { foreignKey: 'productId', as: 'parentProduct' });

  // Association between Cart and Product through CartProduct
  Cart.belongsToMany(Product, {
    through: CartProduct,
    foreignKey: 'cartId',
    otherKey: 'productId',
    as: 'items',
  });
  Product.belongsToMany(Cart, {
    through: CartProduct,
    foreignKey: 'productId',
    otherKey: 'cartId',
    as: 'carts',
  });
}

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');

    setDatabaseAssociations();

    await sequelize.sync({ force: true });

    console.log('All models were synchronized successfully.');

    // Test
    const user = await User.create({
      email: 'john.doe@example.com',
      password: 'securepassword',
    });

    const cart = await Cart.create({ userId: user.id });

    const product = await Product.create({
      name: 'Test Product',
      price: 9.99,
      description: 'A test product',
      imageUrl: 'https://example.com/image.jpg',
    });

    await cart.addItem(product, { through: { quantity: 2 } });

    const cartWithProducts = await Cart.findOne({
      where: { id: cart.id },
      include: [{ model: Product, as: 'items' }],
    });
    console.log(JSON.stringify(cartWithProducts, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database', error);
    throw error;
  }
};
