import { useEffect, useState } from "react";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/products.service";
import { useDebounce } from "./useDebounce";
import type { Product, ProductCategory } from "@/types/product.types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        let result: Product[];

        if (debouncedSearchTerm.trim() !== "") {
          result = await searchProducts(debouncedSearchTerm);
        } else if (category) {
          result = await getProductsByCategory(category);
        } else {
          result = await getProducts();
        }

        setProducts(result);
      } catch (err) {
        setError("No se pudieron cargar los productos. Intenta de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, debouncedSearchTerm]);

  return {
    products,
    loading,
    error,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
  };
}
