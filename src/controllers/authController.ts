import type { Request, Response } from 'express';
import type { AuthService } from '../services/authService';
import { jwtConfig } from '../config/jwt';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const loginRequest = {
        email: email,
        password: password,
      };

      const { accessToken, refreshToken } =
        await this.authService.login(loginRequest);

      // Create a secure cookie with refresh token
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: parseInt(jwtConfig.jwtRefreshExpiration) * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ accessToken });
    } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({ message: `Error: ${err.message}` });
    }
  };

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const registerRequest = {
      email: email,
      password: password,
    };

    return res.status(200).json({ message: 'Registered' });
  };

  refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies;

    console.log(refreshToken);

    return res.status(200).json({ message: refreshToken });
  };

  logout = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Logout' });
  };
}
