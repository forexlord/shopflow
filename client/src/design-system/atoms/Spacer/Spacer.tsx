import { cx } from "../../utils/cx";
import styles from "./Spacer.module.css";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpacerProps {
  size?: SpacerSize;
  axis?: "vertical" | "horizontal";
  className?: string;
}

export function Spacer({
  size = "md",
  axis = "vertical",
  className,
}: SpacerProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        styles.spacer,
        styles[size],
        axis === "horizontal" && styles.horizontal,
        className
      )}
    />
  );
}
