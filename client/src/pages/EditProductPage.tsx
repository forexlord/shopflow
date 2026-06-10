import { useParams } from "react-router-dom";
import { Link, Text } from "../design-system";
import { ProductForm } from "../features/products/components/ProductForm/ProductForm";
import { useProduct } from "../features/products/hooks/useProduct";
import styles from "./ProductFormPage.module.css";

export default function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <Text variant="body-md" color="secondary">
          Loading product...
        </Text>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className={styles.page}>
        <Text variant="body-md" color="secondary">
          Unable to load this product.
        </Text>
        <Link to="/" variant="default">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Text variant="headline-xl" as="h1">
          Edit product
        </Text>
        <Text variant="body-md" color="secondary">
          Update listing details for {product.name}.
        </Text>
      </header>
      <ProductForm mode="edit" product={product} />
    </main>
  );
}
