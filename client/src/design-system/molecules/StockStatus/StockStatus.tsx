import { Text } from "../../atoms";
import { cx } from "../../utils/cx";
import styles from "./StockStatus.module.css";

export interface StockStatusProps {
  stock: number;
}

export function StockStatus({ stock }: StockStatusProps) {
  const inStock = stock > 0;

  return (
    <div className={styles.status}>
      <span
        className={cx(styles.dot, inStock ? styles.inStock : styles.outOfStock)}
        aria-hidden="true"
      />
      <Text variant="label-md" color={inStock ? "success" : "danger"}>
        {inStock ? `In Stock (${stock} units)` : "Out of Stock"}
      </Text>
    </div>
  );
}
