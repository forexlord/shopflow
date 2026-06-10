import { ProductDto } from "./product.dto";

export interface ProductListResponseDto {
  products: ProductDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
}
