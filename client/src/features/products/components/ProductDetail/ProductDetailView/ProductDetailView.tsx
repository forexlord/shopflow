import { Breadcrumb } from "../../../../../design-system";
import type { Product } from "../../../../../types/product.types";
import { ProductDetailPanel } from "../ProductDetailPanel/ProductDetailPanel";
import { ProductGallery } from "../ProductGallery/ProductGallery";
import styles from "./ProductDetailView.module.css";

export interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const breadcrumbItems = [
    { label: "Products", to: "/" },
    ...(product.category ? [{ label: product.category }] : []),
    { label: product.name },
  ];

  return (
    <article className={styles.view}>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />

      <div className={styles.content}>
        <div className={styles.galleryColumn}>
          <ProductGallery imageUrl={product.imageUrl} alt={product.name} />
        </div>
        <div className={styles.detailsColumn}>
          <ProductDetailPanel product={product} />
        </div>
      </div>
    </article>
  );
}
