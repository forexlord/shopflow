import { User, IUser } from "./models/user.model";

export class UsersService {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }
}

export const usersService = new UsersService();
