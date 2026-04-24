import {
  Product,
  type ProductCreationAttributes,
  type ProductUpdateAttributes,
} from '../models/product';
import { ProductRepository } from '../repositories/productRepository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findByID(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    return product;
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async addProduct(productData: ProductCreationAttributes): Promise<Product> {
    return this.productRepository.create(productData);
  }

  async updateProduct(
    productId: number,
    updatedData: ProductUpdateAttributes,
  ): Promise<Product> {
    const product = await this.productRepository.findByID(productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return this.productRepository.update(product, updatedData);
  }

  async deleteProduct(productId: number): Promise<void> {
    const product = await this.productRepository.findByID(productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return this.productRepository.delete(product);
  }
}
