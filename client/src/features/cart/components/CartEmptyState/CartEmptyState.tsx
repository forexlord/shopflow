import { Link } from "react-router-dom";
import { Icon, Text } from "../../../../design-system";
import styles from "./CartEmptyState.module.css";

export function CartEmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.iconWrap}>
        <div className={styles.glow} aria-hidden="true" />
        <Icon name="shopping_basket" className={styles.icon} />
      </div>

      <div className={styles.copy}>
        <Text variant="headline-xl" as="h2">
          Your cart is empty
        </Text>
        <Text variant="body-lg" color="secondary">
          Looks like you haven&apos;t added anything to your cart yet.
        </Text>
      </div>

      <Link to="/" className={styles.shopButton}>
        Shop now
      </Link>
    </div>
  );
}
