import express, { type Request } from 'express';
import cors from 'cors';
import productRoutes from '../routes/products';
import cartRoutes from '../routes/user/cart';
import { User } from '../models/user';

interface RequestWithUser extends Request {
  user?: User;
}

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // mock middleware
  app.use(async (req: RequestWithUser, res, next) => {
    const user = await User.findByPk(1); // Mock user retrieval

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user; // Attach user to request
    console.log(`Mock middleware: User ${user.name} attached to request`);
    next();
  });

  // add routes
  app.use(productRoutes);
  app.use(cartRoutes);

  return app;
}
