import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserOrders } from "@/services/orders.service";
import { useAuth } from "@/hooks/useAuth";
import { OrderCard } from "@/components/orders/OrderCard";
import type { Order } from "@/types/order.types";

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      setLoading(true);
      const result = await getUserOrders(user.uid);
      setOrders(result);
      setLoading(false);
    }

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="container-app py-8">
        <p className="text-gray-400">Cargando tus órdenes...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container-app flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-3xl">📦</span>
        <p className="text-gray-400">Todavía no tenés órdenes.</p>
        <Link to="/catalog" className="font-medium text-brand-purple">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Mis órdenes</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
