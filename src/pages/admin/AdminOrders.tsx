import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/services/orders.service";
import type { Order, OrderStatus } from "@/types/order.types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const result = await getAllOrders();
    setOrders(result);
    setLoading(false);
  }

  async function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    await updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  }

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) {
    return <p className="text-gray-400">Cargando órdenes...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">Órdenes</h1>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilterStatus("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filterStatus === "all"
              ? "bg-admin-indigo text-white shadow-md"
              : "border border-dark-border text-gray-300 hover:border-admin-indigo hover:text-white"
          }`}
        >
          Todas
        </button>
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              filterStatus === status
                ? "bg-admin-indigo text-white shadow-md"
                : "border border-dark-border text-gray-300 hover:border-admin-indigo hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl bg-dark-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-dark-border text-gray-400">
              <th className="p-3">Orden</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-dark-border text-gray-200"
              >
                <td className="p-3">#{order.id.slice(0, 8)}</td>
                <td className="p-3">{order.shippingAddress.fullName}</td>
                <td className="p-3 text-admin-indigo">
                  ${order.total.toFixed(2)}
                </td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as OrderStatus,
                      )
                    }
                    className="rounded-lg border border-dark-border bg-dark-bg px-2 py-1 text-sm text-white outline-none"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
