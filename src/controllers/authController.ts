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
    const { name, email, password } = req.body;
    const registerRequest = {
      name: name,
      email: email,
      password: password,
    };

    return res.status(200).json({ message: 'Registered' });
  };
}
