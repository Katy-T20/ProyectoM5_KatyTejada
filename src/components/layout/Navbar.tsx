import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    clearCart();
    navigate("/");
  }

  return (
    <nav className="border-b border-dark-border bg-dark-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-2xl font-bold text-brand-purple">
          Ignite Beauty Shop
        </Link>

        {/* Botón hamburguesa - solo móvil */}
        <button
          className="text-white sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Links - escritorio */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            to="/catalog"
            className="text-sm text-gray-300 hover:text-brand-teal"
          >
            Catálogo
          </Link>

          <Link
            to="/cart"
            className="text-sm text-gray-300 hover:text-brand-teal"
          >
            Carrito ({itemCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm text-gray-300 hover:text-brand-teal"
                >
                  Admin
                </Link>
              )}
              {user.role === "customer" && (
                <Link
                  to="/orders"
                  className="text-sm text-gray-300 hover:text-brand-teal"
                >
                  Mis órdenes
                </Link>
              )}
              <span className="text-sm text-gray-400">
                Hola {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-brand-purple"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-brand-teal"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-brand-purple"
              >
                Registrarme
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-dark-border px-4 py-3 sm:hidden">
          <Link
            to="/catalog"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300"
          >
            Catálogo
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300"
          >
            Carrito ({itemCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-300"
                >
                  Admin
                </Link>
              )}
              {user.role === "customer" && (
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-300"
                >
                  Mis órdenes
                </Link>
              )}
              <span className="text-sm text-gray-400">
                Hola {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-left text-sm font-medium text-brand-purple"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-300"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-brand-purple"
              >
                Registrarme
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
