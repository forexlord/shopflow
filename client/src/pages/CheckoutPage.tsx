import { CheckoutView } from "../features/cart/components/CheckoutView/CheckoutView";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  return (
    <main className={styles.page}>
      <CheckoutView />
    </main>
  );
}
