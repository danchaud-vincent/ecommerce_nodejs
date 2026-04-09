import type { Cart } from '../models/cart';
import type { CartRepository } from '../repositories/cartRepository';

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCartByUserId(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      // If no cart exists for the user, create an empty one
      cart = await this.cartRepository.createCartForUser(userId);
    }
    return cart;
  }

  async addProductToCart(
    productId: number,
    userId: number,
    quantity = 1,
  ): Promise<Cart> {
    try {
      const cart = await this.getCartByUserId(userId);

      const existingProductInCart = await this.cartRepository.getProductInCart(
        cart.id,
        productId,
      );

      if (existingProductInCart) {
        await this.cartRepository.incrementProductQuantity(
          cart.id,
          productId,
          quantity,
        );
      } else {
        await this.cartRepository.addProductToCart(
          cart.id,
          productId,
          quantity,
        );
      }

      const updatedCart = await this.getCartByUserId(userId);

      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to add product with ID:${productId} to cart.`);
    }
  }

  async deleteProductFromCart(
    productId: number,
    userId: number,
  ): Promise<{ message: string }> {
    try {
      const cart = await this.getCartByUserId(userId);

      const existingProductInCart = await this.cartRepository.getProductInCart(
        cart.id,
        productId,
      );

      if (!existingProductInCart) {
        throw new Error('Product not found in cart.');
      }

      await this.cartRepository.removeProductFromCart(cart.id, productId);

      return { message: `Product with id ${productId} deleted.` };
    } catch (error: any) {
      throw new Error(
        'Failed to remove the product from the cart:',
        error.message,
      );
    }
  }
}
