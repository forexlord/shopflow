import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label className={cx(styles.wrapper, className)} htmlFor={id}>
      <input type="checkbox" id={id} className={styles.input} {...props} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
