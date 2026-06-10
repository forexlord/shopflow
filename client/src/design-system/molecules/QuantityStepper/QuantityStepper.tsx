import { Icon } from "../../atoms/Icon/Icon";
import { IconButton } from "../../atoms/IconButton/IconButton";
import styles from "./QuantityStepper.module.css";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
}: QuantityStepperProps) {
  function decrement() {
    if (value > min) onChange(value - 1);
  }

  function increment() {
    if (max === undefined || value < max) onChange(value + 1);
  }

  return (
    <div className={styles.stepper} role="group" aria-label="Quantity">
      <IconButton
        className={styles.button}
        label="Decrease quantity"
        onClick={decrement}
        disabled={value <= min}
      >
        <Icon name="remove" size="sm" />
      </IconButton>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <IconButton
        className={styles.button}
        label="Increase quantity"
        onClick={increment}
        disabled={max !== undefined && value >= max}
      >
        <Icon name="add" size="sm" />
      </IconButton>
    </div>
  );
}
