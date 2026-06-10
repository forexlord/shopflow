import type { LabelHTMLAttributes, ReactNode } from "react";
import type { LabelVariant } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Label.module.css";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  required?: boolean;
  children: ReactNode;
}

export function Label({
  variant = "default",
  required = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cx(
        styles.label,
        styles[variant],
        required && styles.required,
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
