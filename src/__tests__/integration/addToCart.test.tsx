import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
import { ProductDetail } from "@/pages/products/ProductDetail";
import type { Product } from "@/types/product.types";

const mockProduct: Product = {
  id: "prod-1",
  name: "Sérum de Vitamina C",
  description: "Sérum facial iluminador",
  price: 24.99,
  stock: 50,
  category: "skincare",
  imageUrl: "https://example.com/img.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock("@/services/products.service", () => ({
  getProductById: vi.fn(() => Promise.resolve(mockProduct)),
}));

function CartCount() {
  const { itemCount } = useCart();
  return <span data-testid="cart-count">{itemCount}</span>;
}

function renderWithProviders() {
  return render(
    <CartProvider>
      <CartCount />
      <MemoryRouter initialEntries={["/product/prod-1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>,
  );
}

describe("Integración: agregar producto al carrito", () => {
  it("agrega el producto al hacer click y actualiza el contador", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText("Sérum de Vitamina C")).toBeInTheDocument();
    });

    expect(screen.getByTestId("cart-count").textContent).toBe("0");

    const addButton = screen.getByRole("button", {
      name: /agregar al carrito/i,
    });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId("cart-count").textContent).toBe("1");
    });
  });
});
