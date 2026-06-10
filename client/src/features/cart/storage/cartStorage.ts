import type { CartItem } from "../../../context/CartContext";

function getCartKey(userId: string): string {
  return `shopflow_cart_${userId}`;
}

export function loadUserCart(userId: string): CartItem[] {
  const raw = localStorage.getItem(getCartKey(userId));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    localStorage.removeItem(getCartKey(userId));
    return [];
  }
}

export function saveUserCart(userId: string, items: CartItem[]): void {
  localStorage.setItem(getCartKey(userId), JSON.stringify(items));
}

export function clearUserCart(userId: string): void {
  localStorage.removeItem(getCartKey(userId));
}
