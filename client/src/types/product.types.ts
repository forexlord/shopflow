export type ProductSortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "popular";

export type ProductViewMode = "grid" | "list";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  popularity: number;
  createdAt: string;
}

export interface ProductFilters {
  search: string;
  categories: string[];
  maxPrice: number;
  inStockOnly: boolean;
  sort: ProductSortOption;
  page: number;
  view: ProductViewMode;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  popularity?: number;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  popularity?: number;
}
