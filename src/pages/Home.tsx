import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "@/services/products.service";
import { useAuth } from "@/hooks/useAuth";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/types/product.types";

export function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      const result = await getProducts();
      setProducts(result.slice(0, 6));
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-40">
          {products.slice(0, 3).map((product) => (
            <img
              key={product.id}
              src={product.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-dark-bg/80" />

        <div className="relative px-4 py-20 text-center sm:py-28">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            IGNITE BEAUTY
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            {user
              ? `Hola ${user.displayName}, descubrí lo nuevo para vos`
              : "Belleza que enciende tu mejor versión"}
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-block rounded-lg bg-brand-purple px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-purple-dark"
          >
            Ver catálogo
          </Link>
        </div>
      </div>

      <div className="container-app py-10">
        <h2 className="mb-6 text-2xl font-bold text-white">Destacados</h2>
        <ProductGrid products={products.slice(0, 4)} loading={loading} />
      </div>
    </div>
  );
}
