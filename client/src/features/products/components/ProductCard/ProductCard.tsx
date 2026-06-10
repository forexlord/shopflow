import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Icon, Text } from "../../../../design-system";
import { useCart } from "../../../../context/CartContext";
import type { Product, ProductViewMode } from "../../../../types/product.types";
import { formatPrice } from "../../utils/formatPrice";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./ProductCard.module.css";

export interface ProductCardProps {
  product: Product;
  view: ProductViewMode;
}

export function ProductCard({ product, view }: ProductCardProps) {
  const { addItem } = useCart();
  const inStock = product.stock > 0;
  const detailPath = `/products/${product.id}`;

  function handleAddToCart(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!inStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
  }

  return (
    <Card
      variant={inStock ? "interactive" : "bordered"}
      padding="none"
      className={cx(
        styles.card,
        inStock && styles.interactive,
        !inStock && styles.unavailable,
        view === "list" && styles.list
      )}
    >
      <Link to={detailPath} className={styles.mediaLink}>
        <div className={styles.imageWrap}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
              loading="lazy"
            />
          ) : null}
          {product.category ? (
            <Badge variant="category" className={styles.categoryTag}>
              {product.category}
            </Badge>
          ) : null}
          {!inStock ? (
            <div className={styles.overlay}>
              <span className={styles.outOfStockLabel}>Out of Stock</span>
            </div>
          ) : null}
        </div>
      </Link>

      <div className={cx(styles.body, view === "list" && styles.listBody)}>
        <div className={view === "list" ? styles.listContent : undefined}>
          <Link to={detailPath} className={styles.titleLink}>
            <Text variant="headline-sm" as="h3" className={styles.title}>
              {product.name}
            </Text>
          </Link>
          {view === "list" ? (
            <Text variant="body-md" color="secondary" className={styles.description}>
              {product.description}
            </Text>
          ) : null}
          <Text variant="headline-sm" color="primary" className={styles.price}>
            {formatPrice(product.price)}
          </Text>
        </div>
        {inStock ? (
          <Button
            variant="primary"
            size="md"
            fullWidth={view !== "list"}
            className={styles.action}
            onClick={handleAddToCart}
          >
            <Icon name="shopping_cart" size="sm" />
            Add to Cart
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="md"
            fullWidth={view !== "list"}
            disabled
            className={styles.action}
          >
            <Icon name="block" size="sm" />
            Notify Me
          </Button>
        )}
      </div>
    </Card>
  );
}
