import { Product, type ProductCreationAttributes } from '../models/product';
import { ProductRepository } from '../repositories/productRepository';

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  getProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  addProduct(productData: ProductCreationAttributes): Promise<Product> {
    return this.productRepository.create(productData);
  }
}
