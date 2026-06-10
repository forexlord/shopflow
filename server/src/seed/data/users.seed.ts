export interface UserSeed {
  email: string;
  password: string;
  name: string;
}

export const usersSeed: UserSeed[] = [
  {
    email: "admin@shopflow.com",
    password: "password123",
    name: "Admin User",
  },
  {
    email: "shopper@shopflow.com",
    password: "password123",
    name: "Demo Shopper",
  },
];
