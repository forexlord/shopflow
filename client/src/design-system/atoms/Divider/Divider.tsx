import { cx } from "../../utils/cx";
import styles from "./Divider.module.css";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  className,
}: DividerProps) {
  return (
    <hr
      className={cx(
        styles.divider,
        orientation === "vertical" && styles.vertical,
        className
      )}
    />
  );
}
