import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import type { LinkVariant } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Link.module.css";

type BaseLinkProps = {
  variant?: LinkVariant;
  children: ReactNode;
  className?: string;
};

type InternalLinkProps = BaseLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
    href?: never;
    external?: false;
  };

type ExternalLinkProps = BaseLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: never;
    external: true;
  };

export type LinkProps = InternalLinkProps | ExternalLinkProps;

const variantStyles: Record<LinkVariant, string> = {
  default: styles.default,
  nav: styles.nav,
  "nav-active": styles["nav-active"],
  inline: styles.inline,
};

export function Link({
  variant = "default",
  className,
  children,
  ...props
}: LinkProps) {
  const variantClass = cx(styles.link, variantStyles[variant], className);

  if ("external" in props && props.external) {
    const { external: _, href, ...rest } = props;
    return (
      <a
        href={href}
        className={variantClass}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { to, ...rest } = props as InternalLinkProps;
  return (
    <RouterLink to={to} className={variantClass} {...rest}>
      {children}
    </RouterLink>
  );
}
