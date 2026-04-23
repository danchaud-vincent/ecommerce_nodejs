import { User, type UserCreationAttributes } from '../models/user';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    });
  }

  async create(userData: UserCreationAttributes): Promise<User> {
    return User.create(userData);
  }
}
