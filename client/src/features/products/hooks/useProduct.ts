import { useEffect, useState } from "react";
import { fetchProductById } from "../../../api/products.api";
import type { Product } from "../../../types/product.types";

export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      setError("Product not found");
      return;
    }

    let cancelled = false;

    async function loadProduct() {
      if (!productId) return;

      setIsLoading(true);
      setError("");

      try {
        const data = await fetchProductById(productId);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Failed to load product";
          setError(message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { product, isLoading, error };
}
