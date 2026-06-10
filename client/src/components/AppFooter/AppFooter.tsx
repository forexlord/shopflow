import { Text } from "../../design-system";
import styles from "./AppFooter.module.css";

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Help Center", href: "#" },
];

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Text variant="label-md">ShopFlow</Text>
        <Text variant="label-sm" color="secondary">
          © 2026 ShopFlow. All rights reserved.
        </Text>
      </div>
      <div className={styles.links}>
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.link}>
            <Text variant="label-sm" color="secondary">
              {link.label}
            </Text>
          </a>
        ))}
      </div>
    </footer>
  );
}
