import type { Cart } from '../models/cart';
import type { CartRepository } from '../repositories/cartRepository';
import type { ProductRepository } from '../repositories/productRepository';

export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
  ) {}

  async getCartByUserId(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      // If no cart exists for the user, create an empty one
      cart = await this.cartRepository.createCartForUser(userId);
    }
    return cart;
  }

  async updateProductQuantity(
    productId: number,
    userId: number,
    quantity: number,
  ): Promise<Cart> {
    try {
      const product = await this.productRepository.findByID(productId);

      if (!product) {
        throw new Error(`Product ${productId} does not exist in the catalog.`);
      }

      const cart = await this.getCartByUserId(userId);
      const existingProductInCart = await this.cartRepository.getProductInCart(
        cart.id,
        productId,
      );

      if (!existingProductInCart) {
        if (quantity > 0) {
          await this.cartRepository.addProductToCart(
            cart.id,
            productId,
            quantity,
          );
        } else {
          throw new Error(
            'Cannot decrement a product that is not in the cart.',
          );
        }
      } else {
        const newQuantity = existingProductInCart.quantity + quantity;

        if (newQuantity > 0) {
          await this.cartRepository.updateProductQuantity(
            cart.id,
            productId,
            quantity,
          );
        } else {
          await this.cartRepository.removeProductFromCart(cart.id, productId);
        }
      }

      const updatedCart = this.getCartByUserId(userId);

      return updatedCart;
    } catch (error: any) {
      console.error(error.message);
      throw new Error(`Failed to update the quantity -> ${error.message}`);
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
