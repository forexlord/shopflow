import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="page">
      <h1>Welcome to ShopFlow</h1>
      <p>Your full-stack e-commerce app — React + Vite frontend, Express API backend.</p>
      <Link to="/products" className="btn">
        Browse products
      </Link>
    </section>
  );
}
