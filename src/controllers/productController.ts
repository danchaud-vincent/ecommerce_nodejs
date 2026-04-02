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

  addProduct = async (req: Request, res: Response) => {
    try {
      const { name, price, description, imageUrl } = req.body;

      const product = await this.productService.addProduct({
        name,
        price,
        description,
        imageUrl,
      });

      res
        .status(201)
        .json({
          message: 'Product added successfully',
          data: product.toJSON(),
        });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}
