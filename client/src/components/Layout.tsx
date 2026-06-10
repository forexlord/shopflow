import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          ShopFlow
        </Link>
        <nav className="nav">
          <Link to="/products">Products</Link>
          <span className="cart-badge">Cart ({itemCount})</span>
          {isAuthenticated ? (
            <button type="button" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
