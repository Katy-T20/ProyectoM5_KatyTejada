import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductCard } from "@/components/products/ProductCard";
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

function renderWithRouter(children: React.ReactNode) {
  return render(<BrowserRouter>{children}</BrowserRouter>);
}

describe("ProductCard", () => {
  it("muestra el nombre del producto", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Sérum de Vitamina C")).toBeInTheDocument();
  });

  it("muestra el precio formateado", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$24.99")).toBeInTheDocument();
  });

  it("muestra la categoría", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    expect(screen.getByText("skincare")).toBeInTheDocument();
  });

  it("enlaza a la página de detalle correcta", () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/prod-1");
  });
});
