export type ProductCategory =
  | "skincare"
  | "makeup"
  | "haircare"
  | "fragrance"
  | "bodycare"
  | "tools";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  image: File | null;
}
