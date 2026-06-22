import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { Register } from "@/pages/auth/Register";
import { Login } from "@/pages/auth/Login";
import { Catalog } from "@/pages/products/Catalog";
import { ProductDetail } from "@/pages/products/ProductDetail";
import { Cart } from "@/pages/cart/Cart";
import { Checkout } from "@/pages/cart/Checkout";
import { Orders } from "@/pages/orders/Orders";

function Home() {
  return <div>Home</div>;
}
function NotFound() {
  return <div>404 - Not Found</div>;
}
function Dashboard() {
  return <div>Admin Dashboard</div>;
}
function AdminProducts() {
  return <div>Admin Products</div>;
}
function AdminOrders() {
  return <div>Admin Orders</div>;
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

        {/* Rutas protegidas de cliente */}
        <Route element={<ProtectedRoute role="customer" />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>

      {/* Rutas protegidas de admin (sin el layout de cliente) */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
