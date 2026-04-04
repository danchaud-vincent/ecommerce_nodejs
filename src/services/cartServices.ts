import type { Cart } from '../models/cart';
import type { CartRepository } from '../repositories/cartRepository';

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getCartByUserId(userId: number): Promise<Cart | null> {
    let cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      // If no cart exists for the user, create an empty one
      cart = await this.cartRepository.createCartForUser(userId);
    }
    return cart;
  }

  async addProductToCart(): Promise<{ message: string }> {
    return this.cartRepository.addProductToCart();
  }
}
