import { Routes, Route } from "react-router-dom";

function Home() {
  return <div>Home</div>;
}
function Login() {
  return <div>Login</div>;
}
function Register() {
  return <div>Register</div>;
}
function Catalog() {
  return <div>Catalog</div>;
}
function ProductDetail() {
  return <div>Product Detail</div>;
}
function Cart() {
  return <div>Cart</div>;
}
function Checkout() {
  return <div>Checkout</div>;
}
function Orders() {
  return <div>Orders</div>;
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
