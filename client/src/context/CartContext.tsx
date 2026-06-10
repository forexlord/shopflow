import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { clearCartRequest, fetchCart, saveCart } from "../api/cart.api";
import {
  clearUserCart,
  loadUserCart,
} from "../features/cart/storage/cartStorage";
import { useAuth } from "./AuthContext";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const SYNC_DEBOUNCE_MS = 400;

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const userId = user?.id;
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const skipSyncRef = useRef(true);
  const syncTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      if (!userId || !token) {
        setItems([]);
        setIsLoading(false);
        skipSyncRef.current = true;
        return;
      }

      setIsLoading(true);
      skipSyncRef.current = true;

      try {
        let serverItems = await fetchCart(token);

        if (serverItems.length === 0) {
          const localItems = loadUserCart(userId);
          if (localItems.length > 0) {
            serverItems = await saveCart(localItems, token);
            clearUserCart(userId);
          }
        }

        if (!cancelled) {
          setItems(serverItems);
        }
      } catch {
        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          skipSyncRef.current = false;
        }
      }
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [userId, token]);

  useEffect(() => {
    if (!userId || !token || skipSyncRef.current) {
      return;
    }

    if (syncTimeoutRef.current !== null) {
      window.clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = window.setTimeout(() => {
      saveCart(items, token).catch(() => undefined);
    }, SYNC_DEBOUNCE_MS);

    return () => {
      if (syncTimeoutRef.current !== null) {
        window.clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [items, userId, token]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      const amount = Math.max(quantity, 1);

      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? {
                  ...i,
                  quantity: i.quantity + amount,
                  imageUrl: item.imageUrl ?? i.imageUrl,
                  category: item.category ?? i.category,
                }
              : i
          );
        }
        return [...prev, { ...item, quantity: amount }];
      });
    },
    []
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    if (token) {
      clearCartRequest(token).catch(() => undefined);
    }
    if (userId) {
      clearUserCart(userId);
    }
  }, [token, userId]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isLoading,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isLoading,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
