import { cx } from "../../utils/cx";
import styles from "./Icon.module.css";

export interface IconProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

export function Icon({ name, size = "md", className }: IconProps) {
  return (
    <span className={cx(styles.icon, styles[size], className)} aria-hidden="true">
      {name}
    </span>
  );
}
