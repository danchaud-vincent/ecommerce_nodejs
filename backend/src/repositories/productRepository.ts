import {
  Product,
  type ProductCreationAttributes,
  type ProductUpdateAttributes,
} from '../models/product';

export class ProductRepository {
  async findByID(productId: number): Promise<Product | null> {
    return Product.findByPk(productId);
  }

  async findAll(): Promise<Product[]> {
    return Product.findAll();
  }

  async create(productData: ProductCreationAttributes): Promise<Product> {
    return Product.create(productData);
  }

  async update(
    product: Product,
    updatedData: ProductUpdateAttributes,
  ): Promise<Product> {
    return product.update(updatedData);
  }

  async delete(product: Product): Promise<void> {
    return product.destroy();
  }
}
