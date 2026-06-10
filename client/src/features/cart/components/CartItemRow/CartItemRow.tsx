import { useState } from "react";
import { Icon, Text } from "../../../../design-system";
import type { CartItem } from "../../../../context/CartContext";
import { useCart } from "../../../../context/CartContext";
import { formatPrice } from "../../../products/utils/formatPrice";
import { CartQuantityStepper } from "../CartQuantityStepper/CartQuantityStepper";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./CartItemRow.module.css";

export interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);
    window.setTimeout(() => removeItem(item.productId), 300);
  }

  const lineTotal = item.price * item.quantity;

  return (
    <div className={cx(styles.row, removing && styles.removing)}>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className={styles.image}
        />
      ) : (
        <div className={cx(styles.image, styles.imagePlaceholder)}>
          <Icon name="image" size="sm" />
        </div>
      )}

      <div className={styles.content}>
        <Text variant="label-md" as="h3">
          {item.name}
        </Text>
        {item.category ? (
          <Text variant="micro" color="secondary" className={styles.meta}>
            {item.category}
          </Text>
        ) : null}
        <div className={styles.actions}>
          <CartQuantityStepper
            value={item.quantity}
            onChange={(quantity) => updateQuantity(item.productId, quantity)}
          />
        </div>
      </div>

      <div className={styles.end}>
        <Text variant="label-md">{formatPrice(lineTotal)}</Text>
        <button
          type="button"
          className={styles.deleteButton}
          aria-label={`Remove ${item.name} from cart`}
          onClick={handleRemove}
        >
          <Icon name="delete" size="sm" />
        </button>
      </div>
    </div>
  );
}
