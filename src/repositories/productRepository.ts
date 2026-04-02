import {
  Product,
  type ProductCreationAttributes,
  type ProductUpdateAttributes,
} from '../models/product';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return Product.findAll();
  }

  async create(productData: ProductCreationAttributes): Promise<Product> {
    return Product.create(productData);
  }

  async update(
    productId: number,
    updatedData: ProductUpdateAttributes,
  ): Promise<Product> {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return product.update(updatedData);
  }

  async delete(productId: number): Promise<void> {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return product.destroy();
  }
}
