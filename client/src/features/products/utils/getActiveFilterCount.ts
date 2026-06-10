import type { ProductFilters } from "../../../types/product.types";
import { DEFAULT_PRODUCT_FILTERS } from "../constants";

export function getActiveFilterCount(filters: ProductFilters): number {
  let count = 0;

  if (filters.categories.length > 0) count += 1;
  if (filters.maxPrice < DEFAULT_PRODUCT_FILTERS.maxPrice) count += 1;
  if (filters.inStockOnly) count += 1;

  return count;
}
