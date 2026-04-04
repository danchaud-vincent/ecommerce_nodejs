import type { CartRepository } from '../repositories/cartRepository';

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  getCart(): Promise<{ message: string }> {
    return this.cartRepository.getCart();
  }

  addProductToCart(): Promise<{ message: string }> {
    return this.cartRepository.addProductToCart();
  }
}
