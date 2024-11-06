export interface ProductInfo {
  productId: number;
  name: string;
  description: string;
  price: number;
  active: boolean;
  userId: number;
  categoryId?: number;
  primaryImageUrl?: string;
}
