import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      {label}
      {children}
    </div>
  );
}
