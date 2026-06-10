import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { seedProducts } from "./seed/seed-products";
import { seedUsers } from "./seed/seed-users";

dotenv.config();

async function seed() {
  await connectDB();

  await seedUsers();
  await seedProducts();

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
