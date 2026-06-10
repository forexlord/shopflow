import bcrypt from "bcryptjs";
import { HttpError } from "../common/errors/http-error";
import { usersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { signAccessToken } from "./jwt.util";

export class AuthService {
  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const email = dto.email?.trim().toLowerCase();
    const password = dto.password;

    if (!email || !password) {
      throw new HttpError(400, "Email and password are required");
    }

    const user = await usersService.findByEmail(email);
    if (!user) {
      throw new HttpError(401, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new HttpError(401, "Invalid email or password");
    }

    const token = signAccessToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

export const authService = new AuthService();
