import { Icon } from "../../atoms/Icon/Icon";
import { Text } from "../../atoms/Text/Text";
import { cx } from "../../utils/cx";
import styles from "./BrandLogo.module.css";

export interface BrandLogoProps {
  size?: "default" | "compact";
}

export function BrandLogo({ size = "default" }: BrandLogoProps) {
  return (
    <div className={cx(styles.brand, size === "compact" && styles.compact)}>
      <div className={styles.mark}>
        <Icon name="shopping_cart" size={size === "compact" ? "sm" : "md"} />
      </div>
      <Text
        variant={size === "compact" ? "headline-sm" : "headline-md"}
        className={styles.name}
      >
        ShopFlow
      </Text>
    </div>
  );
}
