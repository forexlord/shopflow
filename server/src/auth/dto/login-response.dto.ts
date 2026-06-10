import type { UserRole } from "../../users/user-role";

export interface LoginResponseDto {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}
