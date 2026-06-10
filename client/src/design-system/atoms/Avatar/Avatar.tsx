import { cx } from "../../utils/cx";
import styles from "./Avatar.module.css";

export interface AvatarProps {
  initials: string;
  className?: string;
}

export function Avatar({ initials, className }: AvatarProps) {
  return <span className={cx(styles.avatar, className)}>{initials}</span>;
}
