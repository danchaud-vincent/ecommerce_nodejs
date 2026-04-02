import { Product, type ProductCreationAttributes } from '../models/product';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return Product.findAll();
  }

  async create(productData: ProductCreationAttributes): Promise<Product> {
    return Product.create(productData);
  }
}
