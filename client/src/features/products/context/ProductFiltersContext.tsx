import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { ProductFilters } from "../../../types/product.types";
import { DEFAULT_PRODUCT_FILTERS } from "../constants";

interface ProductFiltersContextValue {
  filters: ProductFilters;
  updateFilters: (patch: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  toggleCategory: (category: string) => void;
  setSearch: (search: string) => void;
}

const ProductFiltersContext = createContext<ProductFiltersContextValue | null>(
  null
);

export function ProductFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_PRODUCT_FILTERS);

  const updateFilters = useCallback((patch: Partial<ProductFilters>) => {
    setFilters((current) => ({
      ...current,
      ...patch,
      page:
        patch.page ??
        (Object.keys(patch).some((key) => key !== "page") ? 1 : current.page),
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_PRODUCT_FILTERS);
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setFilters((current) => {
      const categories = current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category];

      return { ...current, categories, page: 1 };
    });
  }, []);

  const setSearch = useCallback((search: string) => {
    updateFilters({ search });
  }, [updateFilters]);

  const value = useMemo(
    () => ({
      filters,
      updateFilters,
      clearFilters,
      toggleCategory,
      setSearch,
    }),
    [filters, updateFilters, clearFilters, toggleCategory, setSearch]
  );

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}

export function useProductFiltersContext() {
  const context = useContext(ProductFiltersContext);
  if (!context) {
    throw new Error(
      "useProductFiltersContext must be used within ProductFiltersProvider"
    );
  }
  return context;
}
