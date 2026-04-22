import bcrypt from 'bcryptjs';

import type { UserRepository } from '../repositories/userRepository';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt/jwtUtils';

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
}
