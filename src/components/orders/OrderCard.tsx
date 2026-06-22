import type { Order, OrderStatus } from "@/types/order.types";

interface OrderCardProps {
  order: Order;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  completed: "Completada",
  cancelled: "Cancelada",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  completed: "bg-brand-teal/20 text-brand-teal",
  cancelled: "bg-red-500/20 text-red-400",
};

export function OrderCard({ order }: OrderCardProps) {
  const dateValue =
    order.createdAt instanceof Date
      ? order.createdAt
      : (order.createdAt as unknown as { toDate: () => Date }).toDate();

  const formattedDate = dateValue.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-dark-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Orden #{order.id.slice(0, 8)}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <span className="text-xs text-gray-500">{formattedDate}</span>

      <div className="flex flex-col gap-1">
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between text-sm text-gray-300"
          >
            <span>
              {item.productName} x{item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-dark-border pt-2 text-base font-semibold text-white">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
