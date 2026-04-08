import { CartProduct } from '../models/cartProduct';

export class CartProductRepository {
  async findProduct(
    cartId: number,
    productId: number,
  ): Promise<CartProduct | null> {
    return CartProduct.findOne({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });
  }

  async addProduct(cartId: number, productId: number, quantity: number) {
    return CartProduct.create({
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    });
  }

  async updateProductQuantity(
    cartProductItem: CartProduct,
    newQuantity: number,
  ): Promise<CartProduct> {
    cartProductItem.quantity = newQuantity;
    return cartProductItem.save();
  }
}
