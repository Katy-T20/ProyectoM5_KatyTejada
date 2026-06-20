import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import type { Product } from "@/types/product.types";

const CART_STORAGE_KEY = "ecommerce_cart";

interface CartContextValue {
  items: ReturnType<typeof cartReducer>["items"];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCartFromStorage() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return initialCartState;
  try {
    return JSON.parse(stored);
  } catch {
    return initialCartState;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function addItem(product: Product, quantity: number) {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  }

  function removeItem(productId: string) {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }

  function updateQuantity(productId: string, quantity: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
}
