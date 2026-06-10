import { Icon } from "../Icon/Icon";
import { cx } from "../../utils/cx";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <Icon
      name="progress_activity"
      size="sm"
      className={cx(styles.spinner, className)}
    />
  );
}
