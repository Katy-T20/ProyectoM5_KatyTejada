import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "@/services/products.service";
import type { Product } from "@/types/product.types";

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const result = await getProducts();
    setProducts(result);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `¿Eliminar "${name}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) {
    return <p className="text-gray-400">Cargando productos...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Productos</h1>
        <Link
          to="/admin/products/new"
          className="rounded-lg bg-admin-indigo px-4 py-2 text-sm font-medium text-white hover:bg-admin-indigo-dark"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-dark-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-dark-border text-gray-400">
              <th className="p-3">Imagen</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-dark-border text-gray-200"
              >
                <td className="p-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3 capitalize text-gray-400">
                  {product.category}
                </td>
                <td className="p-3 text-admin-indigo">
                  ${product.price.toFixed(2)}
                </td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="text-brand-teal hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-400 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
