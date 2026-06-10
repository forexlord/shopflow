import { Icon } from "../../atoms/Icon/Icon";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { cx } from "../../utils/cx";
import styles from "./ViewToggle.module.css";

export type ViewMode = "grid" | "list";

export interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className={styles.group} role="group" aria-label="View mode">
      <IconButton
        label="Grid view"
        className={cx(styles.button, value === "grid" && styles.active)}
        onClick={() => onChange("grid")}
      >
        <Icon name="grid_view" size="sm" />
      </IconButton>
      <IconButton
        label="List view"
        className={cx(styles.button, value === "list" && styles.active)}
        onClick={() => onChange("list")}
      >
        <Icon name="view_list" size="sm" />
      </IconButton>
    </div>
  );
}
