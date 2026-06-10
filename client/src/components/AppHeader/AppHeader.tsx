import { useLocation } from "react-router-dom";
import {
  Avatar,
  BrandLogo,
  Icon,
  IconButton,
  Link,
  SearchInput,
  cx,
} from "../../design-system";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useProductFiltersContext } from "../../features/products/context/ProductFiltersContext";
import { HeaderCartButton } from "./HeaderCartButton";
import { HeaderNavLink } from "./HeaderNavLink";
import styles from "./AppHeader.module.css";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function AppHeader() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { filters, setSearch } = useProductFiltersContext();
  const location = useLocation();
  const isProductsActive =
    location.pathname === "/" || location.pathname.startsWith("/products/");

  return (
    <header className={styles.header}>
      <Link to="/" variant="default" className={styles.brandLink}>
        <BrandLogo size="compact" />
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        <HeaderNavLink to="/" active={isProductsActive}>
          Products
        </HeaderNavLink>
        <HeaderNavLink to="/">Checkout</HeaderNavLink>
      </nav>

      <div className={styles.center}>
        <div className={styles.searchSlot}>
          <SearchInput
            variant="navbar"
            placeholder="Search products..."
            value={filters.search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchDesktop}>
          <SearchInput
            variant="navbar"
            placeholder="Search products..."
            value={filters.search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>

        <HeaderCartButton itemCount={itemCount} />

        {user ? (
          <div className={styles.userCluster}>
            <Avatar initials={getInitials(user.name)} />
            <IconButton
              label="Logout"
              className={cx(styles.actionButton, styles.logoutButton)}
              onClick={logout}
            >
              <Icon name="logout" size="sm" />
            </IconButton>
          </div>
        ) : null}
      </div>
    </header>
  );
}
