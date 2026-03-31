import { Product } from '../models/product';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return Product.findAll();
  }
}
