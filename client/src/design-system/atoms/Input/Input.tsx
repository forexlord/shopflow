import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { InputState } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
  message?: ReactNode;
  bare?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { state = "default", message, bare = false, className, id, ...props },
    ref
  ) {
    const isError = state === "error";
    const inputClassName = cx(
      styles.input,
      isError && styles.error,
      className
    );

    if (bare) {
      return (
        <input
          ref={ref}
          id={id}
          className={inputClassName}
          aria-invalid={isError || undefined}
          {...props}
        />
      );
    }

    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          id={id}
          className={inputClassName}
          aria-invalid={isError || undefined}
          {...props}
        />
        {message && (
          <span
            className={cx(styles.message, isError && styles.messageError)}
            role={isError ? "alert" : undefined}
          >
            {message}
          </span>
        )}
      </div>
    );
  }
);
