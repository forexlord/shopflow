import { useState } from "react";
import {
  Button,
  Divider,
  Icon,
  Input,
  Spinner,
  Text,
} from "../../../../design-system";
import { useCart } from "../../../../context/CartContext";
import { useToast } from "../../../../context/ToastContext";
import { formatPrice } from "../../../products/utils/formatPrice";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./OrderSummary.module.css";

type CheckoutState = "idle" | "loading" | "success";

export function OrderSummary() {
  const { subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");
  const [promoCode, setPromoCode] = useState("");

  const isProcessing = checkoutState !== "idle";

  async function handleCheckout() {
    if (isProcessing) return;

    setCheckoutState("loading");

    await new Promise((resolve) => window.setTimeout(resolve, 2000));

    setCheckoutState("success");
    clearCart();
    showToast("Test purchase successful");

    window.setTimeout(() => {
      setCheckoutState("idle");
    }, 2000);
  }

  return (
    <aside className={styles.summary}>
      <Text variant="headline-md" as="h2">
        Order summary
      </Text>

      <div className={styles.lines}>
        <div className={styles.line}>
          <Text variant="body-md" color="secondary">
            Subtotal
          </Text>
          <Text variant="body-md" color="secondary">
            {formatPrice(subtotal)}
          </Text>
        </div>
        <div className={styles.line}>
          <Text variant="body-md" color="secondary">
            Shipping
          </Text>
          <Text variant="body-md" color="secondary">
            Free
          </Text>
        </div>
        <div className={styles.line}>
          <Text variant="body-md" color="secondary">
            Estimated Tax
          </Text>
          <Text variant="body-md" color="secondary">
            {formatPrice(0)}
          </Text>
        </div>
      </div>

      <Divider />

      <div className={styles.line}>
        <Text variant="headline-sm">Total</Text>
        <Text variant="headline-sm">{formatPrice(subtotal)}</Text>
      </div>

      <div className={styles.promo}>
        <Input
          className={styles.promoInput}
          placeholder="Promo code"
          value={promoCode}
          onChange={(event) => setPromoCode(event.target.value)}
          aria-label="Promo code"
        />
        <Button variant="secondary" type="button">
          Apply
        </Button>
      </div>

      <div className={styles.checkout}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          className={cx(
            styles.checkoutButton,
            checkoutState === "success" && styles.success
          )}
          disabled={isProcessing && checkoutState === "loading"}
          onClick={handleCheckout}
        >
          {checkoutState === "loading" ? (
            <Spinner />
          ) : checkoutState === "success" ? (
            <Icon name="check_circle" size="sm" />
          ) : null}
          {checkoutState === "success"
            ? "Purchase complete"
            : "Proceed to checkout"}
        </Button>

        <div className={styles.secure}>
          <Icon name="lock" size="sm" />
          <Text variant="micro" color="secondary">
            Secure checkout powered by ShopFlow
          </Text>
        </div>
      </div>

      <div className={styles.paymentIcons} aria-hidden="true">
        <Icon name="credit_card" />
        <Icon name="account_balance" />
        <Icon name="payments" />
      </div>
    </aside>
  );
}
