export type ProductSortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular";

export interface ProductQueryDto {
  search?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
}
