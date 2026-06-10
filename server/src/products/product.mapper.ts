import { IProduct } from "./models/product.model";
import { ProductDto } from "./dto/product.dto";

export function toProductDto(product: IProduct): ProductDto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    stock: product.stock,
    popularity: product.popularity,
    createdAt: product.createdAt.toISOString(),
  };
}
