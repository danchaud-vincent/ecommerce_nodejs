import express from 'express';

const productRoutes = express.Router();

productRoutes.get('/products', () => {
  console.log('Products controller');
});

export default productRoutes;
