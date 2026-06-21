import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-pink-500">
          Ignite Beauty Shop
        </Link>

        {/* Botón hamburguesa - solo móvil */}
        <button
          className="text-gray-700 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Links - escritorio */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            to="/catalog"
            className="text-sm text-gray-700 hover:text-pink-500"
          >
            Catálogo
          </Link>

          <Link
            to="/cart"
            className="text-sm text-gray-700 hover:text-pink-500"
          >
            Carrito ({itemCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm text-gray-700 hover:text-pink-500"
                >
                  Admin
                </Link>
              )}
              {user.role === "customer" && (
                <Link
                  to="/orders"
                  className="text-sm text-gray-700 hover:text-pink-500"
                >
                  Mis órdenes
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Hola {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-pink-500"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-pink-500"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-pink-500"
              >
                Registrarme
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:hidden">
          <Link
            to="/catalog"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-700"
          >
            Catálogo
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-700"
          >
            Carrito ({itemCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-700"
                >
                  Admin
                </Link>
              )}
              {user.role === "customer" && (
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-gray-700"
                >
                  Mis órdenes
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Hola {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-left text-sm font-medium text-pink-500"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-pink-500"
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
