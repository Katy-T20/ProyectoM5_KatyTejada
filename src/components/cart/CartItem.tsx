import type { CartItem as CartItemType } from "@/types/order.types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 border-b border-dark-border py-4">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-dark-surface">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-sm font-medium text-white">{item.product.name}</h3>
        <span className="text-sm text-brand-purple">
          ${item.price.toFixed(2)}
        </span>

        <div className="mt-1 flex items-center gap-2">
          <label className="text-xs text-gray-400">Cantidad</label>
          <input
            type="number"
            min={1}
            max={item.product.stock}
            value={item.quantity}
            onChange={(e) =>
              onUpdateQuantity(item.product.id, Number(e.target.value))
            }
            className="w-16 rounded-lg border border-dark-border bg-dark-surface px-2 py-1 text-sm text-white outline-none focus:ring-2 focus:ring-brand-purple"
          />
        </div>
      </div>

      <button
        onClick={() => onRemove(item.product.id)}
        className="text-sm text-red-400 hover:text-red-300"
      >
        Eliminar
      </button>
    </div>
  );
}
