import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { TextVariant } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Text.module.css";

type TextColor =
  | "default"
  | "secondary"
  | "primary"
  | "danger"
  | "success"
  | "inverse";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  as?: ElementType;
  children: ReactNode;
}

const variantToElement: Record<TextVariant, ElementType> = {
  "headline-xl": "h1",
  "headline-lg": "h2",
  "headline-md": "h3",
  "headline-sm": "h4",
  "body-lg": "p",
  "body-md": "p",
  "label-md": "span",
  "label-sm": "span",
  micro: "span",
};

export function Text({
  variant = "body-md",
  color = "default",
  as,
  className,
  children,
  ...props
}: TextProps) {
  const Component = as ?? variantToElement[variant];

  return (
    <Component
      className={cx(
        styles.text,
        styles[variant],
        styles[`color-${color}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
