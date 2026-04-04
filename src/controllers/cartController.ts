import type { Request, Response } from 'express';
import type { CartService } from '../services/cartServices';

export class CartController {
  constructor(private cartService: CartService) {}

  getCart = async (req: Request, res: Response) => {
    try {
      const cartId = req.body.cartId;
      const cart = await this.cartService.getCart(cartId);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get cart' });
    }
  };

  addProductToCart = async (req: Request, res: Response) => {
    const result = await this.cartService.addProductToCart();
    res.status(200).json(result);
  };
}
