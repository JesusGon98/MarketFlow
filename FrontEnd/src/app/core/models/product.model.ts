import { Category } from './category.model';

export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
}
