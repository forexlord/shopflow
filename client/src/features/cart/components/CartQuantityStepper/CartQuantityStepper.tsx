import styles from "./CartQuantityStepper.module.css";

export interface CartQuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export function CartQuantityStepper({
  value,
  onChange,
}: CartQuantityStepperProps) {
  return (
    <div className={styles.stepper} role="group" aria-label="Quantity">
      <button
        type="button"
        className={styles.button}
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
      >
        -
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles.button}
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
