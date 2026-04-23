import bcrypt from 'bcryptjs';

import type { UserRepository } from '../repositories/userRepository';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt/jwtUtils';
import type { User, UserCreationAttributes } from '../models/user';
import type { Response } from 'express';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(loginRequest: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(loginRequest.email);

    if (!user) {
      throw new Error('User not found!');
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }

    const accessToken: string = generateAccessToken(loginRequest);
    const refreshToken: string = generateRefreshToken(loginRequest);

    // save the refresh token in db
    await this.userRepository.setRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(registerRequest: {
    email: string;
    password: string;
  }): Promise<void> {
    const userFound = await this.userRepository.findByEmail(
      registerRequest.email,
    );

    if (userFound) {
      throw new Error(
        `User with email ${registerRequest.email} already exits.`,
      );
    }

    const passwordCrypted = await bcrypt.hash(registerRequest.password, 12);

    const userData: UserCreationAttributes = {
      email: registerRequest.email,
      password: passwordCrypted,
    };

    await this.userRepository.create(userData);
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const payload = verifyRefreshToken(refreshToken);

      const user = await this.userRepository.findByEmail(payload.email);

      if (!user) {
        throw new Error('Unauthorized');
      }

      const accessToken: string = generateAccessToken({
        email: user.email,
        password: user.password,
      });

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error('Forbidden');
    }
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }
}
