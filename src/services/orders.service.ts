import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderItem, OrderStatus } from "@/types/order.types";

const ORDERS_COLLECTION = "orders";

export async function createOrder(
  userId: string,
  items: OrderItem[],
  shippingAddress: Order["shippingAddress"],
): Promise<string> {
  const rawTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = Math.round(rawTotal * 100) / 100;

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    userId,
    items,
    total,
    status: "pending" as OrderStatus,
    shippingAddress,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return docRef.id;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Order[];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const docSnap = await getDoc(doc(db, ORDERS_COLLECTION, id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Order;
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Order[];
}

export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("status", "==", status),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Order[];
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<void> {
  await updateDoc(doc(db, ORDERS_COLLECTION, id), {
    status,
    updatedAt: new Date(),
  });
}
