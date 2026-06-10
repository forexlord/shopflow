import type { ReactNode } from "react";
import { ProductFiltersProvider } from "../features/products/context/ProductFiltersContext";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <ProductFiltersProvider>{children}</ProductFiltersProvider>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
