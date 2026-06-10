import type { UserRole } from "../../users/user-role";

export interface UserSeed {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export const usersSeed: UserSeed[] = [
  {
    email: "admin@shopflow.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
  {
    email: "shopper@shopflow.com",
    password: "password123",
    name: "Demo Shopper",
    role: "shopper",
  },
];
