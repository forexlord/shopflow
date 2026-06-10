import {
  Checkbox,
  Icon,
  IconButton,
  LinkButton,
  RangeSlider,
  Text,
  Toggle,
} from "../../../../design-system";
import type { ProductFilters } from "../../../../types/product.types";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { PRICE_RANGE_MAX } from "../../constants";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./ProductFilters.module.css";

export interface ProductFiltersProps {
  filters: ProductFilters;
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
  onToggleCategory: (category: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
  onClear: () => void;
}

export function ProductFiltersPanel({
  filters,
  categories,
  isOpen,
  onClose,
  onToggleCategory,
  onMaxPriceChange,
  onInStockOnlyChange,
  onClear,
}: ProductFiltersProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const showSidebar = isDesktop || isOpen;

  return (
    <>
      <button
        type="button"
        className={cx(styles.backdrop, isOpen && !isDesktop && styles.backdropVisible)}
        aria-label="Close filters"
        onClick={onClose}
      />

      <aside
        className={cx(styles.sidebar, showSidebar && styles.sidebarOpen)}
        aria-hidden={!showSidebar}
      >
        <div className={styles.header}>
          <Text variant="headline-sm">Filters</Text>
          <div className={styles.headerActions}>
            <LinkButton type="button" onClick={onClear}>
              Clear filters
            </LinkButton>
            <IconButton
              className={styles.closeButton}
              label="Close filters"
              onClick={onClose}
            >
              <Icon name="close" size="sm" />
            </IconButton>
          </div>
        </div>

        <section className={styles.section}>
          <Text variant="label-md" color="secondary" className={styles.sectionTitle}>
            Category
          </Text>
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <Checkbox
                key={category}
                id={`category-${category}`}
                label={category}
                checked={filters.categories.includes(category)}
                onChange={() => onToggleCategory(category)}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Text variant="label-md" color="secondary" className={styles.sectionTitle}>
            Price Range
          </Text>
          <RangeSlider
            min={0}
            max={PRICE_RANGE_MAX}
            value={filters.maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            minLabel="$0"
            maxLabel="$1,000+"
          />
        </section>

        <section className={styles.section}>
          <Toggle
            id="in-stock-only"
            label="In stock only"
            checked={filters.inStockOnly}
            onChange={(event) => onInStockOnlyChange(event.target.checked)}
          />
        </section>
      </aside>
    </>
  );
}
