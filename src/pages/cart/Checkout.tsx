import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { createOrder } from "@/services/orders.service";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { OrderItem } from "@/types/order.types";

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.product.imageUrl,
      }));

      await createOrder(user.uid, orderItems, {
        fullName,
        address,
        city,
        zipCode,
        phone,
      });

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al confirmar tu orden. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-gray-400">No tenés productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Confirmar pedido</h1>

      <div className="flex flex-col gap-6 sm:flex-row">
        <form onSubmit={handleConfirm} className="flex flex-1 flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">
            Dirección de envío
          </h2>

          <Input
            id="fullName"
            label="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            id="address"
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <Input
            id="city"
            label="Ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Input
            id="zipCode"
            label="Código postal"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
          <Input
            id="phone"
            label="Teléfono"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" loading={loading}>
            Confirmar pedido (simulado)
          </Button>
        </form>

        <div className="flex h-fit flex-col gap-3 rounded-xl bg-dark-surface p-4 sm:w-72">
          <h2 className="text-lg font-semibold text-white">Resumen</h2>

          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm text-gray-300"
            >
              <span>
                {item.product.name} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="mt-2 flex justify-between border-t border-dark-border pt-2 text-base font-semibold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
