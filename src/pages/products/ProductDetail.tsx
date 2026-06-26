import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/services/products.service";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types/product.types";

const DOTS = [
  { cx: 60, cy: 40, r: 4, delay1: "0s", delay2: "0s" },
  { cx: 160, cy: 90, r: 3, delay1: "0.4s", delay2: "1s" },
  { cx: 280, cy: 50, r: 5, delay1: "0.8s", delay2: "2s" },
  { cx: 380, cy: 110, r: 3, delay1: "1.2s", delay2: "0.5s" },
  { cx: 500, cy: 60, r: 4, delay1: "1.6s", delay2: "1.5s" },
  { cx: 620, cy: 100, r: 3, delay1: "2s", delay2: "2.5s" },
  { cx: 700, cy: 40, r: 5, delay1: "0.3s", delay2: "3s" },
  { cx: 40, cy: 180, r: 3, delay1: "0.6s", delay2: "0.8s" },
  { cx: 150, cy: 220, r: 4, delay1: "1s", delay2: "1.8s" },
  { cx: 260, cy: 170, r: 3, delay1: "1.4s", delay2: "2.8s" },
  { cx: 400, cy: 230, r: 5, delay1: "1.8s", delay2: "0.3s" },
  { cx: 540, cy: 190, r: 3, delay1: "2.2s", delay2: "1.3s" },
  { cx: 660, cy: 240, r: 4, delay1: "0.2s", delay2: "2.3s" },
  { cx: 90, cy: 280, r: 4, delay1: "0.5s", delay2: "0.6s" },
  { cx: 220, cy: 300, r: 3, delay1: "0.9s", delay2: "1.6s" },
  { cx: 350, cy: 270, r: 5, delay1: "1.3s", delay2: "2.6s" },
  { cx: 480, cy: 300, r: 3, delay1: "1.7s", delay2: "0.4s" },
  { cx: 610, cy: 280, r: 4, delay1: "2.1s", delay2: "1.4s" },
  { cx: 740, cy: 300, r: 3, delay1: "0.1s", delay2: "2.4s" },
];

function AnimatedDotsBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {DOTS.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          className="animate-floatDot animate-colorShift fill-brand-purple"
          style={{
            animationDelay: `${dot.delay1}, ${dot.delay2}`,
          }}
        />
      ))}
    </svg>
  );
}

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
      <div className="relative overflow-hidden rounded-2xl bg-dark-surface">
        <AnimatedDotsBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/15 via-dark-bg/60 to-dark-bg/90" />

        <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
          <div className="aspect-square w-full overflow-hidden rounded-xl shadow-2xl shadow-black/40 sm:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 sm:w-1/2">
            <span className="text-xs uppercase text-gray-400">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            <p className="text-gray-300">{product.description}</p>
            <span className="text-2xl font-semibold text-brand-purple">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400">
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
    </div>
  );
}
