import { Link } from "react-router-dom";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-dark-border bg-dark-surface transition hover:border-brand-purple"
    >
      <div className="h-40 shrink-0 bg-dark-border sm:h-44 lg:h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid flex-1 grid-rows-[1rem_2.5rem_1.25rem] gap-1 p-3">
        <span className="text-xs uppercase text-gray-500">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-white line-clamp-2">
          {product.name}
        </h3>
        <span className="self-end text-sm font-semibold text-brand-purple">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}
