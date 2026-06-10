import { Text } from "../../../../design-system";
import type { Product, ProductViewMode } from "../../../../types/product.types";
import { ProductCard } from "../ProductCard/ProductCard";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./ProductGrid.module.css";

export interface ProductGridProps {
  products: Product[];
  view: ProductViewMode;
  isLoading: boolean;
  error: string;
}

export function ProductGrid({ products, view, isLoading, error }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={styles.state}>
        <Text variant="body-md" color="secondary">
          Loading products...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <Text variant="body-md" color="danger">
          {error}
        </Text>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.state}>
        <Text variant="body-md" color="secondary">
          No products match your filters.
        </Text>
      </div>
    );
  }

  return (
    <div
      className={cx(
        styles.grid,
        view === "grid" ? styles.gridMode : styles.listMode
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={view} />
      ))}
    </div>
  );
}
