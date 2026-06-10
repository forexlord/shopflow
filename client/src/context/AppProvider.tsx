import type { ReactNode } from "react";
import { ProductFiltersProvider } from "../features/products/context/ProductFiltersContext";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductFiltersProvider>{children}</ProductFiltersProvider>
      </CartProvider>
    </AuthProvider>
  );
}
