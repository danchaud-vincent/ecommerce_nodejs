import {
  Product,
  type ProductCreationAttributes,
  type ProductUpdateAttributes,
} from '../models/product';
import { ProductRepository } from '../repositories/productRepository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  addProduct(productData: ProductCreationAttributes): Promise<Product> {
    return this.productRepository.create(productData);
  }

  updateProduct(
    productId: number,
    updatedData: ProductUpdateAttributes,
  ): Promise<Product> {
    return this.productRepository.update(productId, updatedData);
  }
}
