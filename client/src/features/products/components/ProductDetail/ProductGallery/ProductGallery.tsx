import { Text } from "../../../../../design-system";
import styles from "./ProductGallery.module.css";

export interface ProductGalleryProps {
  imageUrl?: string;
  alt: string;
}

export function ProductGallery({ imageUrl, alt }: ProductGalleryProps) {
  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {imageUrl ? (
          <img src={imageUrl} alt={alt} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <Text variant="body-md" color="secondary">
              No image available
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
