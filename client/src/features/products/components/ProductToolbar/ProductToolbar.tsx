import {
  Button,
  Icon,
  SearchInput,
  Select,
  Text,
  ViewToggle,
} from "../../../../design-system";
import type { ProductFilters, ProductViewMode } from "../../../../types/product.types";
import type { ProductSortOption } from "../../../../types/product.types";
import { SORT_OPTIONS } from "../../constants";
import styles from "./ProductToolbar.module.css";

export interface ProductToolbarProps {
  filters: ProductFilters;
  total: number;
  activeFilterCount: number;
  onOpenFilters: () => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: ProductSortOption) => void;
  onViewChange: (view: ProductViewMode) => void;
}

export function ProductToolbar({
  filters,
  total,
  activeFilterCount,
  onOpenFilters,
  onSearchChange,
  onSortChange,
  onViewChange,
}: ProductToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <SearchInput
        placeholder={`Search ${total} products...`}
        value={filters.search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <div className={styles.controls}>
        <Text variant="label-md" color="secondary">
          {total} products found
        </Text>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className={styles.filterButton}
            onClick={onOpenFilters}
          >
            <Icon name="tune" size="sm" />
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Button>
          <ViewToggle value={filters.view} onChange={onViewChange} />
          <Select
            className={styles.sort}
            value={filters.sort}
            onChange={(event) => onSortChange(event.target.value as ProductSortOption)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
