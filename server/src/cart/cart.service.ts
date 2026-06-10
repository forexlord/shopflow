import { HttpError } from "../common/errors/http-error";
import { CartItemDto } from "./dto/cart-item.dto";
import { Cart, ICartItem } from "./models/cart.model";

function validateItems(items: unknown): CartItemDto[] {
  if (!Array.isArray(items)) {
    throw new HttpError(400, "Cart items must be an array");
  }

  return items.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new HttpError(400, `Invalid cart item at index ${index}`);
    }

    const record = item as Record<string, unknown>;
    const productId =
      typeof record.productId === "string" ? record.productId.trim() : "";
    const name = typeof record.name === "string" ? record.name.trim() : "";
    const price = Number(record.price);
    const quantity = Number(record.quantity);

    if (!productId || !name) {
      throw new HttpError(400, `Invalid cart item at index ${index}`);
    }

    if (!Number.isFinite(price) || price < 0) {
      throw new HttpError(400, `Invalid price at index ${index}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new HttpError(400, `Invalid quantity at index ${index}`);
    }

    const normalized: CartItemDto = {
      productId,
      name,
      price,
      quantity,
    };

    if (typeof record.imageUrl === "string" && record.imageUrl.trim()) {
      normalized.imageUrl = record.imageUrl.trim();
    }

    if (typeof record.category === "string" && record.category.trim()) {
      normalized.category = record.category.trim();
    }

    return normalized;
  });
}

function toCartItems(items: ICartItem[]): CartItemDto[] {
  return items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    category: item.category,
  }));
}

export class CartService {
  async getByUserId(userId: string): Promise<CartItemDto[]> {
    const cart = await Cart.findOne({ userId });
    return cart ? toCartItems(cart.items) : [];
  }

  async replaceItems(userId: string, items: unknown): Promise<CartItemDto[]> {
    const validated = validateItems(items);

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: validated },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    return toCartItems(cart.items);
  }

  async clear(userId: string): Promise<void> {
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
}

export const cartService = new CartService();
