import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";

const DOTS = [
  { cx: 80, cy: 60, r: 4, delay1: "0s", delay2: "0s" },
  { cx: 200, cy: 120, r: 3, delay1: "0.5s", delay2: "1s" },
  { cx: 700, cy: 80, r: 5, delay1: "1s", delay2: "2s" },
  { cx: 650, cy: 180, r: 3, delay1: "1.5s", delay2: "0.5s" },
  { cx: 100, cy: 350, r: 4, delay1: "2s", delay2: "1.5s" },
  { cx: 720, cy: 380, r: 3, delay1: "0.3s", delay2: "2.5s" },
  { cx: 150, cy: 420, r: 5, delay1: "0.8s", delay2: "0.2s" },
  { cx: 680, cy: 420, r: 3, delay1: "1.3s", delay2: "1.2s" },
];

function AnimatedDotsBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 460"
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

export function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  }

  if (items.length === 0) {
    return (
      <div className="container-app relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <AnimatedDotsBackground />

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-teal text-4xl shadow-[0_0_50px_rgba(155,93,229,0.3)] animate-floatCart">
            🛒
          </span>

          <h1 className="mt-7 text-xl font-medium text-white sm:text-2xl">
            Tu carrito está vacío
          </h1>
          <p className="mt-2 max-w-sm text-sm text-gray-400">
            Explorá el catálogo y descubrí los productos que van a encender tu
            rutina de belleza.
          </p>

          <Link
            to="/catalog"
            className="mt-7 inline-block rounded-lg border border-brand-purple-dark px-8 py-3 text-sm font-semibold uppercase tracking-wide text-brand-purple-dark transition hover:bg-brand-purple-dark hover:text-white"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Carrito</h1>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="flex h-fit flex-col gap-4 rounded-xl bg-dark-surface p-4 sm:w-72">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-white">
              ${total.toFixed(2)}
            </span>
          </div>

          <Button onClick={handleCheckout}>Continuar al pago</Button>
        </div>
      </div>
    </div>
  );
}
