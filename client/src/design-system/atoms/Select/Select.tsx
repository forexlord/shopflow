import type { SelectHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Select.module.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={cx(styles.select, className)} {...props}>
      {children}
    </select>
  );
}
