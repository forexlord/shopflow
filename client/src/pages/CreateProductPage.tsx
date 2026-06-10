import { Text } from "../design-system";
import { ProductForm } from "../features/products/components/ProductForm/ProductForm";
import styles from "./ProductFormPage.module.css";

export default function CreateProductPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Text variant="headline-xl" as="h1">
          Create product
        </Text>
        <Text variant="body-md" color="secondary">
          Add a new item to the catalog. Fields match the product model — use a
          public image URL if you have one.
        </Text>
      </header>
      <ProductForm mode="create" />
    </main>
  );
}
