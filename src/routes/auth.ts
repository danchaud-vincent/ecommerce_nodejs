import express from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../services/authService';
import { UserRepository } from '../repositories/authRepository';

const authRoutes = express.Router();

const authRepository = new UserRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.get('/login', authController.login);

authRoutes.post('/register', authController.register);

authRoutes.get('/refresh', authController.refresh);

authRoutes.post('/logout', authController.logout);

export default authRoutes;
