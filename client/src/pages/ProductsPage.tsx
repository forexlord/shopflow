import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../design-system";
import { useAuth } from "../context/AuthContext";
import { ProductFiltersPanel } from "../features/products/components/ProductFilters/ProductFilters";
import { ProductGrid } from "../features/products/components/ProductGrid/ProductGrid";
import { ProductToolbar } from "../features/products/components/ProductToolbar/ProductToolbar";
import { useProductFilters } from "../features/products/hooks/useProductFilters";
import { useProducts } from "../features/products/hooks/useProducts";
import { getActiveFilterCount } from "../features/products/utils/getActiveFilterCount";
import { isAdmin } from "../features/products/utils/isAdmin";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { filters, updateFilters, clearFilters, toggleCategory } =
    useProductFilters();
  const { data, isLoading, error } = useProducts(filters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setFiltersOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.page}>
      <ProductFiltersPanel
        filters={filters}
        categories={data?.categories ?? []}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onToggleCategory={toggleCategory}
        onMaxPriceChange={(maxPrice) => updateFilters({ maxPrice })}
        onInStockOnlyChange={(inStockOnly) => updateFilters({ inStockOnly })}
        onClear={clearFilters}
      />

      <section className={styles.content}>
        <ProductToolbar
          filters={filters}
          total={data?.total ?? 0}
          activeFilterCount={getActiveFilterCount(filters)}
          showCreateButton={isAdmin(user)}
          onCreateProduct={() => navigate("/products/new")}
          onOpenFilters={() => setFiltersOpen(true)}
          onSearchChange={(search) => updateFilters({ search })}
          onSortChange={(sort) => updateFilters({ sort })}
          onViewChange={(view) => updateFilters({ view })}
        />

        <ProductGrid
          products={data?.products ?? []}
          view={filters.view}
          isLoading={isLoading}
          error={error}
        />

        {data && data.totalPages > 1 ? (
          <div className={styles.pagination}>
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={(page) => updateFilters({ page })}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
