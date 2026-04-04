import express from 'express';

const cartRoutes = express.Router();

cartRoutes.get('/cart', (req, res) => {
  res.send('Get user cart');
});

cartRoutes.post('/cart/items', (req, res) => {
  res.send('Add item to cart');
});

export default cartRoutes;
