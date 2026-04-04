import express from 'express';
import { CartController } from '../../controllers/cartController';
import { CartService } from '../../services/cartServices';
import { CartRepository } from '../../repositories/cartRepository';

const cartRoutes = express.Router();

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

cartRoutes.get('/cart', cartController.getCart);

cartRoutes.post('/cart/items', cartController.addProductToCart);

export default cartRoutes;
