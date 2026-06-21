import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product.types";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="aspect-square animate-pulse bg-gray-200" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <span className="text-3xl">🔍</span>
        <p className="text-sm text-gray-500">
          No encontramos productos con esos filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
