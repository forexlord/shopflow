import bcrypt from "bcryptjs";
import { User } from "../users/models/user.model";
import { usersSeed } from "./data/users.seed";

const SALT_ROUNDS = 10;

export async function seedUsers(): Promise<void> {
  await User.deleteMany({});

  const users = await Promise.all(
    usersSeed.map(async (entry) => ({
      email: entry.email.toLowerCase(),
      name: entry.name,
      password: await bcrypt.hash(entry.password, SALT_ROUNDS),
    }))
  );

  await User.insertMany(users);
  console.log(`Seeded ${users.length} users`);
}
