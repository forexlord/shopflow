import type { CartItem } from "../context/CartContext";
import { apiClient } from "./client";

interface CartResponse {
  items: CartItem[];
}

export function fetchCart(token: string): Promise<CartItem[]> {
  return apiClient<CartResponse>("/api/cart", { token }).then(
    (response) => response.items
  );
}

export function saveCart(items: CartItem[], token: string): Promise<CartItem[]> {
  return apiClient<CartResponse>("/api/cart", {
    method: "PUT",
    body: { items },
    token,
  }).then((response) => response.items);
}

export function clearCartRequest(token: string): Promise<void> {
  return apiClient<CartResponse>("/api/cart", {
    method: "DELETE",
    token,
  }).then(() => undefined);
}
