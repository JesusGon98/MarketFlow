export interface Banner {
  id: string;
  storeId: string;
  title: string;
  imageUrl: string;
  displayOrder: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
