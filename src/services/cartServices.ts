import type { Cart } from '../models/cart';
import { CartProduct } from '../models/cartProduct';
import type { CartProductRepository } from '../repositories/cartProductRepository';
import type { CartRepository } from '../repositories/cartRepository';

export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private cartProductRepository: CartProductRepository,
  ) {}

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
  ): Promise<CartProduct> {
    try {
      const cart = await this.getCartByUserId(userId);

      const existingProduct = await this.cartProductRepository.findProduct(
        cart.id,
        productId,
      );

      if (existingProduct) {
        const updateQuantity = existingProduct.quantity + quantity;

        return this.cartProductRepository.updateProductQuantity(
          existingProduct,
          updateQuantity,
        );
      } else {
        return this.cartProductRepository.addProduct(
          cart.id,
          productId,
          quantity,
        );
      }
    } catch (error) {
      throw new Error(`Failed to add product with ${productId} to cart.`);
    }
  }
}
