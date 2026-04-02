import express from 'express';
import cors from 'cors';
import productRoutes from '../routes/products';

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // add routes
  app.use(productRoutes);

  return app;
}
