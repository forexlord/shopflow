import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { Product } from "./products/models/product.model";
import { seedUsers } from "./seed/seed-users";

dotenv.config();

async function seed() {
  await connectDB();

  await Product.deleteMany({});
  await seedUsers();

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
