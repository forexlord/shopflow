import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Toggle.module.css";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Toggle({ label, className, id, ...props }: ToggleProps) {
  return (
    <label className={cx(styles.wrapper, className)} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <span className={styles.switch}>
        <input type="checkbox" id={id} className={styles.input} {...props} />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
      </span>
    </label>
  );
}
