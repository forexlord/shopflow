import type { ProductFilters } from "../../types/product.types";

export const PRICE_RANGE_MAX = 1000;
export const PRODUCTS_PER_PAGE = 6;

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  search: "",
  categories: [],
  maxPrice: PRICE_RANGE_MAX,
  inStockOnly: false,
  sort: "newest",
  page: 1,
  view: "grid",
};

export const SORT_OPTIONS = [
  { value: "newest", label: "Sort by: Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
] as const;
