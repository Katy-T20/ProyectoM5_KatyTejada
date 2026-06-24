import { describe, it, expect, vi } from "vitest";
import { getProducts } from "@/services/products.service";

vi.mock("@/services/firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(() =>
    Promise.resolve({
      docs: [
        {
          id: "prod-1",
          data: () => ({
            name: "Sérum de Vitamina C",
            price: 24.99,
            category: "skincare",
          }),
        },
        {
          id: "prod-2",
          data: () => ({
            name: "Labial Mate",
            price: 15.5,
            category: "makeup",
          }),
        },
      ],
    }),
  ),
}));

describe("products.service - getProducts", () => {
  it("transforma los documentos de Firestore en un array de productos", async () => {
    const products = await getProducts();

    expect(products).toHaveLength(2);
    expect(products[0].id).toBe("prod-1");
    expect(products[0].name).toBe("Sérum de Vitamina C");
    expect(products[1].category).toBe("makeup");
  });
});
