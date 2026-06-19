import type { Product } from "./product.types";

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
}
