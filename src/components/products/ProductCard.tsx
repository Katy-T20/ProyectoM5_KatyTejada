import { Link } from "react-router-dom";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-dark-border bg-dark-surface transition hover:border-brand-purple"
    >
      <div className="aspect-square bg-dark-border">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <span className="text-xs uppercase text-gray-500">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-white line-clamp-2">
          {product.name}
        </h3>
        <span className="text-sm font-semibold text-brand-purple">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}
