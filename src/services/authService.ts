import bcrypt from 'bcryptjs';

import type { UserRepository } from '../repositories/userRepository';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt/jwtUtils';
import type { User } from '../models/user';

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
    user.token = refreshToken;
    user.save();

    return {
      accessToken,
      refreshToken,
    };
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
}
