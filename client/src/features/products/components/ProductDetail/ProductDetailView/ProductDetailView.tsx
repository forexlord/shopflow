import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, ConfirmDialog, Icon } from "../../../../../design-system";
import { deleteProduct } from "../../../../../api/products.api";
import { useAuth } from "../../../../../context/AuthContext";
import { useToast } from "../../../../../context/ToastContext";
import type { Product } from "../../../../../types/product.types";
import { isAdmin } from "../../../utils/isAdmin";
import { ProductDetailPanel } from "../ProductDetailPanel/ProductDetailPanel";
import { ProductGallery } from "../ProductGallery/ProductGallery";
import styles from "./ProductDetailView.module.css";

export interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const userIsAdmin = isAdmin(user);

  const breadcrumbItems = [
    { label: "Products", to: "/" },
    ...(product.category ? [{ label: product.category }] : []),
    { label: product.name },
  ];

  async function handleConfirmDelete() {
    if (!token || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteProduct(product.id, token);
      showToast("Product deleted", "success");
      navigate("/");
    } catch {
      setIsDeleting(false);
    }
  }

  return (
    <article className={styles.view}>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />

      <div className={styles.content}>
        <div className={styles.galleryColumn}>
          <ProductGallery imageUrl={product.imageUrl} alt={product.name} />
        </div>
        <div className={styles.detailsColumn}>
          <ProductDetailPanel product={product} isAdmin={userIsAdmin} />
        </div>
      </div>

      {userIsAdmin ? (
        <footer className={styles.adminFooter}>
          <Button
            type="button"
            variant="ghost"
            className={styles.deleteButton}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Icon name="delete" size="sm" />
            Delete product
          </Button>
        </footer>
      ) : null}

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete product?"
        message={`"${product.name}" will be permanently removed from the catalog. This cannot be undone.`}
        confirmLabel="Delete product"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isDeleting) {
            setDeleteDialogOpen(false);
          }
        }}
      />
    </article>
  );
}
