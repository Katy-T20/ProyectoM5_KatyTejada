import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_LINKS = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/products", label: "Productos" },
  { to: "/admin/orders", label: "Órdenes" },
  { to: "/", label: "Volver a la tienda" },
];

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg sm:flex-row">
      {/* Header móvil */}
      <div className="flex items-center justify-between border-b border-dark-border bg-dark-surface px-4 py-3 sm:hidden">
        <span className="text-lg font-bold text-admin-indigo">Admin Panel</span>
        <button
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`flex-col gap-1 border-r border-dark-border bg-dark-surface p-4 sm:flex sm:w-56 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <span className="mb-4 hidden text-lg font-bold text-admin-indigo sm:block">
          Admin Panel
        </span>

        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              location.pathname === link.to
                ? "bg-admin-indigo text-white"
                : "text-gray-300 hover:bg-dark-border"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="mt-4 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-dark-border"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
