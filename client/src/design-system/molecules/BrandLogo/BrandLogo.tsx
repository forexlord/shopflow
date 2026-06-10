import { Icon } from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import styles from "./BrandLogo.module.css";

export function BrandLogo() {
  return (
    <div className={styles.brand}>
      <div className={styles.mark}>
        <Icon name="shopping_cart" />
      </div>
      <Text variant="headline-md" className={styles.name}>
        ShopFlow
      </Text>
    </div>
  );
}
