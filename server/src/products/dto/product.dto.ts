export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  popularity: number;
  createdAt: string;
}
