import type { HTMLAttributes, ReactNode } from "react";
import type { CardVariant } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "md";
  children: ReactNode;
}

export function Card({
  variant = "bordered",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
