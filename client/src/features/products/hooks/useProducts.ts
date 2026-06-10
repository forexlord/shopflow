import { useEffect, useState } from "react";
import { fetchProducts } from "../../../api/products.api";
import type { ProductFilters, ProductListResponse } from "../../../types/product.types";

export function useProducts(filters: ProductFilters) {
  const [data, setData] = useState<ProductListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchProducts(filters);
        if (!cancelled) {
          setData(response);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load products";
          setError(message);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    const timeoutId = window.setTimeout(loadProducts, filters.search ? 300 : 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [
    filters.search,
    filters.categories,
    filters.maxPrice,
    filters.inStockOnly,
    filters.sort,
    filters.page,
  ]);

  return { data, isLoading, error };
}
