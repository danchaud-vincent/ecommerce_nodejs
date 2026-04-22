import express from 'express';
import { AuthController } from '../controllers/authController';

const authRoutes = express.Router();

const authController = new AuthController();

authRoutes.get('/login', authController.login);

authRoutes.post('/register', authController.register);

authRoutes.get('/refresh', authController.refresh);

authRoutes.post('/logout', authController.logout);

export default authRoutes;
