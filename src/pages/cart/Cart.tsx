import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";

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
      <div className="container-app flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-3xl">🛒</span>
        <p className="text-gray-400">Tu carrito está vacío.</p>
        <Link to="/catalog" className="font-medium text-brand-purple">
          Ver catálogo
        </Link>
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
