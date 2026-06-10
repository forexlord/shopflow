import type {
  CreateProductPayload,
  Product,
  ProductFilters,
  ProductListResponse,
  UpdateProductPayload,
} from "../types/product.types";
import { apiClient } from "./client";

const PRICE_RANGE_MAX = 1000;
const PRODUCTS_PER_PAGE = 6;

function buildQueryParams(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.categories.length > 0) {
    params.set("categories", filters.categories.join(","));
  }

  if (filters.maxPrice < PRICE_RANGE_MAX) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.inStockOnly) {
    params.set("inStockOnly", "true");
  }

  params.set("sort", filters.sort);
  params.set("page", String(filters.page));
  params.set("limit", String(PRODUCTS_PER_PAGE));

  return params.toString();
}

export function fetchProducts(
  filters: ProductFilters,
  token?: string | null
): Promise<ProductListResponse> {
  const query = buildQueryParams(filters);
  return apiClient<ProductListResponse>(`/api/products?${query}`, { token });
}

export function fetchProductById(id: string): Promise<Product> {
  return apiClient<Product>(`/api/products/${id}`);
}

export function fetchCategories(): Promise<string[]> {
  return apiClient<{ categories: string[] }>("/api/products/categories").then(
    (response) => response.categories
  );
}

export function createProduct(
  payload: CreateProductPayload,
  token: string
): Promise<Product> {
  return apiClient<Product>("/api/products", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateProduct(
  id: string,
  payload: UpdateProductPayload,
  token: string
): Promise<Product> {
  return apiClient<Product>(`/api/products/${id}`, {
    method: "PATCH",
    body: payload,
    token,
  });
}

export function deleteProduct(id: string, token: string): Promise<Product> {
  return apiClient<Product>(`/api/products/${id}`, {
    method: "DELETE",
    token,
  });
}
