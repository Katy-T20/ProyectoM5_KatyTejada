import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  addProduct,
  updateProduct,
} from "@/services/products.service";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ProductCategory } from "@/types/product.types";

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "skincare", label: "Skincare" },
  { value: "makeup", label: "Maquillaje" },
  { value: "haircare", label: "Cuidado capilar" },
  { value: "fragrance", label: "Fragancias" },
  { value: "bodycare", label: "Cuidado corporal" },
  { value: "tools", label: "Herramientas" },
];

export function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState<ProductCategory>("skincare");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const product = await getProductById(id);
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(String(product.price));
        setStock(String(product.stock));
        setCategory(product.category);
        setImageUrl(product.imageUrl);
      }
      setLoadingProduct(false);
    }

    fetchProduct();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const productData = {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        imageUrl,
      };

      if (isEditing && id) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar el producto. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingProduct) {
    return <p className="text-gray-400">Cargando producto...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-white">
        {isEditing ? "Editar producto" : "Nuevo producto"}
      </h1>

      <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
        <Input
          id="name"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-300"
          >
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-admin-indigo"
          />
        </div>

        <div className="flex gap-4">
          <Input
            id="price"
            label="Precio"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            id="stock"
            label="Stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-300"
          >
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-admin-indigo"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="imageUrl"
          label="URL de imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" loading={loading} className="w-fit">
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </Button>
      </form>
    </div>
  );
}
