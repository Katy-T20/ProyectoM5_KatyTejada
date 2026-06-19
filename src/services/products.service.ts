import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product, ProductCategory } from "@/types/product.types";

const PRODUCTS_COLLECTION = "products";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Product[];
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("category", "==", category),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Product[];
}

export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const allProducts = await getProducts();
  const lowerTerm = searchTerm.toLowerCase();
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(lowerTerm),
  );
}

export async function getProductById(id: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Product;
}

export async function addProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>,
): Promise<void> {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
    ...data,
    updatedAt: new Date(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}
