import type { CartRepository } from '../repositories/cartRepository';

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  getCart(cartId: string): Promise<{ message: string }> {
    return this.cartRepository.getCart(cartId);
  }

  addProductToCart(): Promise<{ message: string }> {
    return this.cartRepository.addProductToCart();
  }
}
