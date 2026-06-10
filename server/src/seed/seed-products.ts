import { Product } from "../products/models/product.model";
import { productsSeed } from "./data/products.seed";

export async function seedProducts(): Promise<void> {
  await Product.deleteMany({});
  await Product.insertMany(productsSeed);
  console.log(`Seeded ${productsSeed.length} products`);
}
