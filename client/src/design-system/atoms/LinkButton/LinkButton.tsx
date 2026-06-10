import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./LinkButton.module.css";

export interface LinkButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function LinkButton({ className, children, type = "button", ...props }: LinkButtonProps) {
  return (
    <button type={type} className={cx(styles.button, className)} {...props}>
      {children}
    </button>
  );
}
