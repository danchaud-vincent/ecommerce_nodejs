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
    quantity: number,
  ): Promise<CartProduct> {
    return CartProduct.create({
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    });
  }

  async removeProductFromCart(
    cartId: number,
    productId: number,
  ): Promise<void> {
    await CartProduct.destroy({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
  }

  async updateProductQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    await CartProduct.update(
      { quantity: quantity },
      {
        where: {
          cartId: cartId,
          productId: productId,
        },
      },
    );
  }

  async incrementProductQuantity(
    cartId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    await CartProduct.increment('quantity', {
      by: quantity,
      where: { productId: productId, cartId: cartId },
    });
  }
}
