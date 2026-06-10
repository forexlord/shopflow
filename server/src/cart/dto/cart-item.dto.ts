export interface CartItemDto {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

export interface CartResponseDto {
  items: CartItemDto[];
}

export interface UpdateCartDto {
  items: CartItemDto[];
}
