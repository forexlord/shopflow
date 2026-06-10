import type { ReactNode } from "react";
import { Link } from "../../design-system";
import { cx } from "../../design-system/utils/cx";
import styles from "./HeaderNavLink.module.css";

export interface HeaderNavLinkProps {
  to: string;
  active?: boolean;
  children: ReactNode;
}

export function HeaderNavLink({ to, active = false, children }: HeaderNavLinkProps) {
  return (
    <Link to={to} variant="nav" className={cx(styles.link, active && styles.active)}>
      {children}
    </Link>
  );
}
