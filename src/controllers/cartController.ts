import type { Request, Response } from 'express';
import type { CartService } from '../services/cartServices';

export class CartController {
  constructor(private cartService: CartService) {}

  getCart = async (req: Request, res: Response) => {
    const cart = await this.cartService.getCart();
    res.status(200).json(cart);
  };

  addProductToCart = async (req: Request, res: Response) => {
    const result = await this.cartService.addProductToCart();
    res.status(200).json(result);
  };
}
