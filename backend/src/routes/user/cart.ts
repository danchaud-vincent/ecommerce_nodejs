import express from 'express';
import { CartController } from '../../controllers/cartController';
import { CartService } from '../../services/cartService';
import { CartRepository } from '../../repositories/cartRepository';
import { ProductRepository } from '../../repositories/productRepository';

const cartRoutes = express.Router();

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const cartService = new CartService(cartRepository, productRepository);
const cartController = new CartController(cartService);

cartRoutes.get('/cart', cartController.getCart);

cartRoutes.post('/cart/items', cartController.addProductToCart);

cartRoutes.delete('/cart/items/:id', cartController.removeProductFromCart);

export default cartRoutes;
