import type { Request, Response } from 'express';

import { ProductService } from '../services/productService';

export class ProductController {
  constructor(private productService: ProductService) {}

  getProductDetails = async (req: Request, res: Response) => {
    try {
      const productId: number = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'Invalid product id.' });
      }

      const product = await this.productService.getProductById(productId);

      res.status(200).json(product);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

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

      res.status(201).json({
        message: 'Product added successfully',
        data: product,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ message: 'Invalid product id.' });
      }

      const { name, price, description, imageUrl } = req.body;

      const updatedProduct = await this.productService.updateProduct(
        productId,
        {
          name: name,
          price: price,
          description: description,
          imageUrl: imageUrl,
        },
      );

      res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const productId = Number(req.params.id);

      await this.productService.deleteProduct(productId);

      res.status(200).json({
        message: 'Product deleted successfully',
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  };
}
