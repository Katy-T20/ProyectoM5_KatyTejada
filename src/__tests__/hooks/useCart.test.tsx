import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product.types";
import type { ReactNode } from "react";

const mockProduct: Product = {
  id: "prod-1",
  name: "Sérum de Vitamina C",
  description: "Test",
  price: 24.99,
  stock: 50,
  category: "skincare",
  imageUrl: "https://example.com/img.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("arranca con el carrito vacío", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it("agrega un producto y actualiza el total", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.itemCount).toBe(2);
    expect(result.current.total).toBe(49.98);
  });

  it("elimina un producto del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct, 1);
    });

    act(() => {
      result.current.removeItem("prod-1");
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("vacía el carrito con clearCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct, 3);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });
});
