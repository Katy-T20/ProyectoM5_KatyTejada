import { useEffect, useState } from "react";
import { getProducts } from "@/services/products.service";
import { getAllOrders } from "@/services/orders.service";

interface Metrics {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);

      const [products, orders] = await Promise.all([
        getProducts(),
        getAllOrders(),
      ]);

      const totalRevenue = orders
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + order.total, 0);

      const pendingOrders = orders.filter(
        (order) => order.status === "pending",
      ).length;

      setMetrics({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      });

      setLoading(false);
    }

    fetchMetrics();
  }, []);

  if (loading || !metrics) {
    return <p className="text-gray-400">Cargando métricas...</p>;
  }

  const cards = [
    { label: "Productos", value: metrics.totalProducts },
    { label: "Órdenes totales", value: metrics.totalOrders },
    { label: "Órdenes pendientes", value: metrics.pendingOrders },
    { label: "Ingresos totales", value: `$${metrics.totalRevenue.toFixed(2)}` },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-1 rounded-xl bg-dark-surface p-4"
          >
            <span className="text-xs text-gray-300">{card.label}</span>
            <span className="text-2xl font-bold text-brand-purple">
              {card.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
