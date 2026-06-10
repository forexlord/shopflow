import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { Product } from "./products/models/product.model";
import { User } from "./users/models/user.model";

dotenv.config();

async function seed() {
  await connectDB();

  // TODO: add seed data when implementing the backend
  await Product.deleteMany({});
  await User.deleteMany({});

  console.log("Seed complete (no data inserted yet)");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
