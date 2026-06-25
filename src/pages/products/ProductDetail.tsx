import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/services/products.service";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types/product.types";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);
      const result = await getProductById(id);
      setProduct(result);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="container-app py-8">
        <p className="text-gray-400">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-app flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-3xl">😕</span>
        <p className="text-gray-400">No encontramos este producto.</p>
        <Link to="/catalog" className="text-brand-purple font-medium">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-dark-surface sm:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 sm:w-1/2">
          <span className="text-xs uppercase text-gray-500">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <span className="text-2xl font-semibold text-brand-purple">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}
          </span>

          <div className="mt-2 flex items-center gap-3">
            <label className="text-sm text-gray-300">Cantidad</label>
            <input
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-brand-purple"
            />
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-2"
          >
            {added ? "¡Agregado!" : "Agregar al carrito"}
          </Button>

          <Link
            to="/catalog"
            className="mt-4 rounded-lg border border-dark-border px-4 py-2 text-center text-sm text-gray-300 transition hover:border-brand-teal hover:text-brand-teal"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
