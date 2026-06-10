import type { ReactNode } from "react";
import { AUTH_HERO_ALT, AUTH_HERO_IMAGE } from "../../features/auth/constants";
import styles from "./AuthLayout.module.css";

export interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className={styles.layout}>
      <section className={styles.hero} aria-hidden="true">
        <img className={styles.image} src={AUTH_HERO_IMAGE} alt={AUTH_HERO_ALT} />
        <div className={styles.overlay} />
      </section>
      <section className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </section>
    </main>
  );
}
