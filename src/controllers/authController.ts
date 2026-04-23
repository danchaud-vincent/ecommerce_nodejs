import type { Request, Response } from 'express';
import type { AuthService } from '../services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const loginRequest = {
        email: email,
        password: password,
      };

      const { accessToken, refreshToken } = await this.authService.login(
        res,
        loginRequest,
      );

      return res.status(200).json({ accessToken });
    } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({ message: `Error: ${err.message}` });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const registerRequest = {
        email: email,
        password: password,
      };

      await this.authService.register(registerRequest);

      return res.status(201).json({ message: 'Registered successfully!' });
    } catch (err: any) {
      console.log(err);
      return res
        .status(500)
        .json({ message: `Registration failed: ${err.message}` });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const accessToken = await this.authService.refresh(refreshToken);

      return res.status(200).json({ accessToken });
    } catch (err: any) {
      return res.status(403).json({ message: err.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies.refreshToken) {
      return res.status(204);
    }

    await this.authService.logout(res);

    return res.status(200).json({ message: 'Logged out successfully.' });
  };
}
