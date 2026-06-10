export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  popularity?: number;
}
