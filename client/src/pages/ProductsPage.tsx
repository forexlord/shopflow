export default function ProductsPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <section className="page">
      <h1>Products</h1>
      <p>
        Product listing will connect to <code>{apiUrl}/api/products</code> when
        the backend is implemented.
      </p>
    </section>
  );
}
