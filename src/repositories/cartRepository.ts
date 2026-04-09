import { Cart } from '../models/cart';
import { CartProduct } from '../models/cartProduct';
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

  async getProductInCart(
    cartId: number,
    productId: number,
  ): Promise<CartProduct | null> {
    return CartProduct.findOne({
      where: { cartId: cartId, productId: productId },
    });
  }

  async addProductToCart(
    cartId: number,
    productId: number,
  ): Promise<CartProduct> {
    return CartProduct.create({
      cartId: cartId,
      productId: productId,
      quantity: 1,
    });
  }

  async incrementProductQuantity(
    cartId: number,
    productId: number,
  ): Promise<void> {
    CartProduct.increment('quantity', {
      by: 1,
      where: { productId: productId, cartId: cartId },
    });
  }
}
