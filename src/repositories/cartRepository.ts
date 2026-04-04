import { Cart } from '../models/cart';
import { Product } from '../models/product';

export class CartRepository {
  async createCartForUser(userId: number): Promise<Cart> {
    return Cart.create({ userId });
  }

  async getCartByUserId(userId: number): Promise<Cart | null> {
    return Cart.findOne({
      where: { userId },
      include: [
        { model: Product, as: 'items', through: { attributes: ['quantity'] } },
      ],
    });
  }

  async addProductToCart(): Promise<{ message: string }> {
    return Promise.resolve({ message: 'Add item to cart' });
  }
}
