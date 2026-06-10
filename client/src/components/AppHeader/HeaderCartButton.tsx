import { Icon, IconButton } from "../../design-system";
import styles from "./HeaderCartButton.module.css";

export interface HeaderCartButtonProps {
  itemCount: number;
}

export function HeaderCartButton({ itemCount }: HeaderCartButtonProps) {
  return (
    <div className={styles.wrapper}>
      <IconButton
        className={styles.button}
        label={`Cart with ${itemCount} items`}
      >
        <Icon name="shopping_cart" size="sm" />
      </IconButton>
      {itemCount > 0 ? (
        <span className={styles.badge} aria-hidden="true">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </div>
  );
}
