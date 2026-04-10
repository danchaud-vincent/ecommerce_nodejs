import type { Request, Response } from 'express';
import type { CartService } from '../services/cartServices';

export class CartController {
  constructor(private cartService: CartService) {}

  getCart = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const cart = await this.cartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get cart' });
    }
  };

  addProductToCart = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const productId = req.body.productId;
      const quantity = req.body.quantity;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const result = await this.cartService.updateProductQuantity(
        productId,
        userId,
        quantity,
      );
      res.status(200).json(result);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  removeProductFromCart = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const productId = Number(req.params.id);

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const result = await this.cartService.deleteProductFromCart(
        productId,
        userId,
      );
      res.status(200).json(result);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}
