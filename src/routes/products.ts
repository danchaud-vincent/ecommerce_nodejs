import express from 'express';
import { ProductController } from '../controllers/productController';
import { ProductService } from '../services/productService';
import { ProductRepository } from '../repositories/productRepository';

const productRoutes = express.Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRoutes.get('/products', productController.getProducts);

productRoutes.post('/products', productController.addProduct);

productRoutes.put('/products/:id', productController.updateProduct);

productRoutes.delete('/products/:id', productController.deleteProduct);

export default productRoutes;
