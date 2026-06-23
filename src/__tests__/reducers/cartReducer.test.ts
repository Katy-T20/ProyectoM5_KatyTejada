import { describe, it, expect } from "vitest";
import { cartReducer, initialCartState } from "@/contexts/cartReducer";
import type { Product } from "@/types/product.types";

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

describe("cartReducer", () => {
  it("agrega un producto nuevo al carrito vacío", () => {
    const result = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: mockProduct, quantity: 1 },
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].product.id).toBe("prod-1");
    expect(result.items[0].quantity).toBe(1);
  });

  it("suma la cantidad si el producto ya existe en el carrito", () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 1, price: 24.99 }],
    };

    const result = cartReducer(stateWithItem, {
      type: "ADD_ITEM",
      payload: { product: mockProduct, quantity: 2 },
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantity).toBe(3);
  });

  it("elimina un producto del carrito", () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 1, price: 24.99 }],
    };

    const result = cartReducer(stateWithItem, {
      type: "REMOVE_ITEM",
      payload: { productId: "prod-1" },
    });

    expect(result.items).toHaveLength(0);
  });

  it("actualiza la cantidad de un producto existente", () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 1, price: 24.99 }],
    };

    const result = cartReducer(stateWithItem, {
      type: "UPDATE_QUANTITY",
      payload: { productId: "prod-1", quantity: 5 },
    });

    expect(result.items[0].quantity).toBe(5);
  });

  it("vacía el carrito completamente", () => {
    const stateWithItem = {
      items: [{ product: mockProduct, quantity: 3, price: 24.99 }],
    };

    const result = cartReducer(stateWithItem, { type: "CLEAR_CART" });

    expect(result.items).toHaveLength(0);
  });
});
