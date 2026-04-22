import { User } from '../models/user';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
    });
  }
}
