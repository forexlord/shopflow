import { Icon } from "../../atoms/Icon/Icon";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { Text } from "../../atoms/Text/Text";
import { cx } from "../../utils/cx";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function buildPageItems(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", page, "ellipsis", totalPages];
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const items = buildPageItems(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <IconButton
        label="Previous page"
        className={styles.pageButton}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <Icon name="chevron_left" size="sm" />
      </IconButton>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <Text
            key={`ellipsis-${index}`}
            variant="body-md"
            color="secondary"
            className={styles.ellipsis}
          >
            ...
          </Text>
        ) : (
          <button
            key={item}
            type="button"
            className={cx(styles.pageButton, item === page && styles.active)}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}

      <IconButton
        label="Next page"
        className={styles.pageButton}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <Icon name="chevron_right" size="sm" />
      </IconButton>
    </nav>
  );
}
