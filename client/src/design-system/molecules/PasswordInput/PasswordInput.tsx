import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon } from "../../atoms/Icon/Icon";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { Input } from "../../atoms/Input/Input";
import type { InputState } from "../../types";
import { cx } from "../../utils/cx";
import styles from "./PasswordInput.module.css";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  state?: InputState;
}

export function PasswordInput({
  state = "default",
  className,
  id,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Input
        bare
        id={id}
        type={visible ? "text" : "password"}
        state={state}
        className={cx(styles.input, className)}
        {...props}
      />
      <IconButton
        className={styles.toggle}
        label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((prev) => !prev)}
      >
        <Icon name={visible ? "visibility_off" : "visibility"} size="sm" />
      </IconButton>
    </div>
  );
}
