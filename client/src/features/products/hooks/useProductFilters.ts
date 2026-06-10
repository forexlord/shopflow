import { useProductFiltersContext } from "../context/ProductFiltersContext";

export function useProductFilters() {
  return useProductFiltersContext();
}
