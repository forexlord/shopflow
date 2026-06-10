import { useState } from "react";
import {
  Badge,
  Button,
  Icon,
  Label,
  QuantityStepper,
  StockStatus,
  Text,
} from "../../../../../design-system";
import { useCart } from "../../../../../context/CartContext";
import type { Product } from "../../../../../types/product.types";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./ProductDetailPanel.module.css";

export interface ProductDetailPanelProps {
  product: Product;
}

export function ProductDetailPanel({ product }: ProductDetailPanelProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;

  function handleAddToCart() {
    if (!inStock) return;

    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
      },
      quantity
    );
  }

  return (
    <div className={styles.panel}>
      {product.category ? (
        <Badge variant="category" className={styles.categoryTag}>
          {product.category}
        </Badge>
      ) : null}

      <Text variant="headline-xl" as="h1" className={styles.title}>
        {product.name}
      </Text>

      <div className={styles.price}>
        <Text variant="headline-xl" color="primary" className={styles.priceValue}>
          {formatPrice(product.price)}
        </Text>
      </div>

      <section className={styles.about}>
        <Text variant="label-md" className={styles.aboutTitle}>
          About this product
        </Text>
        <Text variant="body-md" color="secondary" className={styles.description}>
          {product.description}
        </Text>
      </section>

      <section className={styles.actions}>
        <div className={styles.actionsRow}>
          <div className={styles.quantityGroup}>
            <Label variant="muted">Quantity</Label>
            <QuantityStepper
              value={quantity}
              max={inStock ? product.stock : 1}
              onChange={setQuantity}
            />
          </div>
          <StockStatus stock={product.stock} />
        </div>

        <Button
          variant="primary"
          size="lg"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <Icon name="shopping_bag" size="sm" />
          Add to Cart
        </Button>
      </section>
    </div>
  );
}
