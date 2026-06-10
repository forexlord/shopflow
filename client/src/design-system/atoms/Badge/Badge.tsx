import type { HTMLAttributes, ReactNode } from "react";
import type { BadgeVariant } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "micro";
  children: ReactNode;
}

export function Badge({
  variant = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        styles.badge,
        styles[variant],
        size === "micro" && styles.micro,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
