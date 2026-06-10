import { LoginDto } from "./dto/login.dto";

export class AuthService {
  async login(_dto: LoginDto): Promise<{ token: string }> {
    // TODO: implement login
    throw new Error("Not implemented");
  }
}

export const authService = new AuthService();
