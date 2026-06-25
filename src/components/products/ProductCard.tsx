import { Link } from "react-router-dom";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dark-border bg-dark-surface transition hover:border-brand-purple">
      <div className="h-56 shrink-0 bg-dark-border sm:h-64 lg:h-72">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid flex-1 grid-rows-[1rem_2.5rem_auto_auto] gap-2 p-4">
        <span className="text-xs uppercase text-gray-500">
          {product.category}
        </span>
        <h3 className="text-base font-medium text-white line-clamp-2">
          {product.name}
        </h3>
        <span className="block rounded-lg bg-brand-purple/15 px-3 py-2 text-center text-sm font-semibold text-brand-purple">
          ${product.price.toFixed(2)}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="block rounded-lg border border-brand-teal px-3 py-2 text-center text-sm font-medium text-brand-teal transition hover:bg-brand-teal hover:text-dark-bg"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
