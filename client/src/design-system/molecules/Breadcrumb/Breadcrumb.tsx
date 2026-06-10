import { Fragment } from "react";
import { Icon } from "../../atoms/Icon/Icon";
import { Link } from "../../atoms/Link/Link";
import { Text } from "../../atoms/Text/Text";
import { cx } from "../../utils/cx";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cx(styles.nav, className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 ? (
              <Icon
                name="chevron_right"
                size="sm"
                className={styles.separator}
              />
            ) : null}
            {item.to && !isLast ? (
              <Link to={item.to} variant="inline" className={styles.link}>
                <Text variant="label-sm" color="secondary">
                  {item.label}
                </Text>
              </Link>
            ) : (
              <Text
                variant="label-sm"
                color={isLast ? "default" : "secondary"}
                className={isLast ? styles.current : undefined}
              >
                {item.label}
              </Text>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
