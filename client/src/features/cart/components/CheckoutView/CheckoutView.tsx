import { Icon, Link, Text } from "../../../../design-system";
import { useCart } from "../../../../context/CartContext";
import { CartEmptyState } from "../CartEmptyState/CartEmptyState";
import { CartItemRow } from "../CartItemRow/CartItemRow";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import styles from "./CheckoutView.module.css";

export function CheckoutView() {
  const { items } = useCart();

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className={styles.layout}>
      <section className={styles.items}>
        <Text variant="headline-xl" as="h1">
          Your cart
        </Text>

        <div className={styles.list}>
          {items.map((item) => (
            <CartItemRow key={item.productId} item={item} />
          ))}
        </div>

        <Link to="/" variant="inline" className={styles.continue}>
          <Icon name="arrow_back" size="sm" />
          Continue shopping
        </Link>
      </section>

      <div className={styles.summary}>
        <OrderSummary />
      </div>
    </div>
  );
}
