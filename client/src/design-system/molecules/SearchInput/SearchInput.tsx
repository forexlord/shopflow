import type { InputHTMLAttributes } from "react";
import { Icon } from "../../atoms/Icon/Icon";
import { Input } from "../../atoms/Input/Input";
import { cx } from "../../utils/cx";
import styles from "./SearchInput.module.css";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant?: "default" | "compact" | "navbar";
}

export function SearchInput({
  variant = "default",
  className,
  ...props
}: SearchInputProps) {
  if (variant === "navbar") {
    return (
      <div className={styles.navbarWrapper}>
        <Icon name="search" size="sm" className={styles.navbarIcon} />
        <Input
          bare
          className={cx(styles.navbarInput, className)}
          type="search"
          {...props}
        />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={styles.compactWrapper}>
        <Icon name="search" size="sm" className={styles.icon} />
        <Input bare className={cx(styles.input, className)} type="search" {...props} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Icon name="search" className={styles.icon} />
      <Input bare className={cx(styles.input, className)} type="search" {...props} />
    </div>
  );
}
