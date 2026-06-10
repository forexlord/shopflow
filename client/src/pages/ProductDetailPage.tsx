import { useParams } from "react-router-dom";
import { Link, Text } from "../design-system";
import { ProductDetailView } from "../features/products/components/ProductDetail/ProductDetailView/ProductDetailView";
import { useProduct } from "../features/products/hooks/useProduct";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <Text variant="body-md" color="secondary">
            Loading product...
          </Text>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <Text variant="body-md" color="danger">
            {error || "Product not found"}
          </Text>
          <Link to="/" variant="default">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ProductDetailView product={product} />
    </div>
  );
}
