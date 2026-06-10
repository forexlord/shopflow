import type { InputHTMLAttributes, ReactNode } from "react";
import { Text } from "../Text/Text";
import { cx } from "../../utils/cx";
import styles from "./RangeSlider.module.css";

export interface RangeSliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  minLabel?: ReactNode;
  maxLabel?: ReactNode;
}

export function RangeSlider({
  minLabel,
  maxLabel,
  className,
  ...props
}: RangeSliderProps) {
  return (
    <div className={styles.wrapper}>
      <input type="range" className={cx(styles.slider, className)} {...props} />
      {(minLabel || maxLabel) && (
        <div className={styles.labels}>
          <Text variant="micro" color="secondary">
            {minLabel}
          </Text>
          <Text variant="micro" color="secondary">
            {maxLabel}
          </Text>
        </div>
      )}
    </div>
  );
}
