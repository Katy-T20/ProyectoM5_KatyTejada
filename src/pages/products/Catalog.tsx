import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types/product.types";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "skincare", label: "Skincare" },
  { value: "makeup", label: "Maquillaje" },
  { value: "haircare", label: "Cuidado capilar" },
  { value: "fragrance", label: "Fragancias" },
  { value: "bodycare", label: "Cuidado corporal" },
  { value: "tools", label: "Herramientas" },
];

export function Catalog() {
  const {
    products,
    loading,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
  } = useProducts();

  return (
    <div className="container-app py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Catálogo</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-brand-purple sm:max-w-xs"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              category === null
                ? "bg-brand-purple text-white"
                : "border border-dark-border text-gray-300"
            }`}
          >
            Todas
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                category === cat.value
                  ? "bg-brand-purple text-white"
                  : "border border-dark-border text-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
