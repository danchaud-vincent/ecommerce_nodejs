import type { Request, Response } from 'express';

export class AuthController {
  constructor() {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginRequest = {
      email: email,
      password: password,
    };

    return res.status(200).json({ message: 'Logged In' });
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
    return res.status(200).json({ message: 'Refreshed' });
  };

  logout = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Logout' });
  };
}
