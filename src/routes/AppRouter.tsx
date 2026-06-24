import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Register } from "@/pages/auth/Register";
import { Login } from "@/pages/auth/Login";
import { Catalog } from "@/pages/products/Catalog";
import { ProductDetail } from "@/pages/products/ProductDetail";
import { Cart } from "@/pages/cart/Cart";
import { Checkout } from "@/pages/cart/Checkout";
import { Orders } from "@/pages/orders/Orders";
import { Dashboard } from "@/pages/admin/Dashboard";
import { AdminProducts } from "@/pages/admin/AdminProducts";
import { ProductForm } from "@/pages/admin/ProductForm";
import { AdminOrders } from "@/pages/admin/AdminOrders";
import { Home } from "@/pages/Home";

function NotFound() {
  return <div>404 - Not Found</div>;
}

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas envueltas en el layout con Navbar */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Rutas protegidas — cliente y admin */}
        <Route
          element={<ProtectedRoute allowedRoles={["customer", "admin"]} />}
        >
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>

      {/* Rutas protegidas de admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/:id/edit" element={<ProductForm />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
