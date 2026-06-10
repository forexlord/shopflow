import { Link } from "react-router-dom";
import { Icon } from "../../design-system";
import styles from "./HeaderCartButton.module.css";

export interface HeaderCartButtonProps {
  itemCount: number;
}

export function HeaderCartButton({ itemCount }: HeaderCartButtonProps) {
  return (
    <div className={styles.wrapper}>
      <Link
        to="/checkout"
        className={styles.button}
        aria-label={`Cart with ${itemCount} items`}
      >
        <Icon name="shopping_cart" size="sm" />
      </Link>
      {itemCount > 0 ? (
        <span className={styles.badge} aria-hidden="true">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </div>
  );
}
