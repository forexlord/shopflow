import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BrandLogo,
  Button,
  FormField,
  Input,
  Label,
  LinkButton,
  PasswordInput,
  Spacer,
  Text,
} from "../../../../design-system";
import { useAuth } from "../../../../context/AuthContext";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      const redirectTo =
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to sign in. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.brand}>
        <BrandLogo />
      </div>

      <header className={styles.header}>
        <Text variant="headline-lg" className={styles.title}>
          Welcome back
        </Text>
        <Text variant="label-md" color="secondary">
          Sign in to your account
        </Text>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <FormField
          label={
            <Label htmlFor="email" variant="muted">
              Email
            </Label>
          }
        >
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            state={error ? "error" : "default"}
            required
          />
        </FormField>

        <div className={styles.passwordField}>
          <div className={styles.passwordLabelRow}>
            <Label htmlFor="password" variant="muted">
              Password
            </Label>
            <LinkButton type="button">Forgot password?</LinkButton>
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            state={error ? "error" : "default"}
            required
          />
        </div>

        {error && (
          <Text variant="body-md" color="danger" className={styles.error}>
            {error}
          </Text>
        )}

        <Spacer size="xs" />

        <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </>
  );
}
