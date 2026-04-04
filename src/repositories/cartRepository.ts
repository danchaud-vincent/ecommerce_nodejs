export class CartRepository {
  async getCart(): Promise<{ message: string }> {
    return Promise.resolve({ message: 'Get user cart' });
  }

  async addProductToCart(): Promise<{ message: string }> {
    return Promise.resolve({ message: 'Add item to cart' });
  }
}
