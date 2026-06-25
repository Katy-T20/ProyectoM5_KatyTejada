import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product.types";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const PAGE_SIZE = 6;

function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-dark-border bg-dark-surface">
      <div className="h-56 animate-pulse bg-dark-border sm:h-64 lg:h-72" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-dark-border" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-dark-border" />
        <div className="h-8 w-full animate-pulse rounded bg-dark-border" />
        <div className="h-8 w-full animate-pulse rounded bg-dark-border" />
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <span className="text-3xl">🔍</span>
        <p className="text-sm text-gray-400">
          No encontramos productos con esos filtros.
        </p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          className="rounded-full border border-brand-purple px-6 py-2 text-sm font-medium text-brand-purple transition hover:bg-brand-purple hover:text-white"
        >
          Cargar más productos
        </button>
      )}
    </div>
  );
}
