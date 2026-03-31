import type { Request, Response } from 'express';

import { ProductService } from '../services/productService';

export class ProductController {
  constructor(private productService: ProductService) {}

  getProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getProducts();

      res.status(200).json(products);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}
