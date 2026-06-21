import { Link } from "react-router-dom";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-md"
    >
      <div className="aspect-square bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <span className="text-xs uppercase text-gray-400">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <span className="text-sm font-semibold text-pink-500">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}
