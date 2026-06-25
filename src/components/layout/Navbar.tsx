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
      {/* Primera fila: logo + saludo/menú hamburguesa */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="bg-gradient-to-r from-brand-purple via-brand-teal to-brand-purple bg-[length:200%_auto] bg-clip-text text-lg font-bold text-transparent animate-gradientShift sm:text-2xl"
        >
          Ignite Beauty Shop
        </Link>

        {/* Saludo - solo escritorio */}
        {user && (
          <span className="hidden text-sm font-medium text-brand-teal sm:block">
            Hola {user.displayName}
          </span>
        )}

        {/* Botón hamburguesa - solo móvil */}
        <button
          className="text-white sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {/* Segunda fila - escritorio: navegación izquierda, carrito/sesión derecha */}
      <div className="hidden border-t border-dark-border sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-gray-300 hover:text-brand-teal"
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className="text-sm text-gray-300 hover:text-brand-teal"
            >
              Catálogo
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm font-medium text-brand-teal hover:underline"
              >
                Admin
              </Link>
            )}
            {user?.role === "customer" && (
              <Link
                to="/orders"
                className="text-sm text-gray-300 hover:text-brand-teal"
              >
                Mis órdenes
              </Link>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/cart"
              className="text-sm text-gray-300 hover:text-brand-teal"
            >
              🛒 ({itemCount})
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-brand-purple"
              >
                🚪 Cerrar sesión
              </button>
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
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-dark-border px-4 py-3 sm:hidden">
          {user && (
            <span className="text-sm font-medium text-brand-teal">
              Hola {user.displayName}
            </span>
          )}

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-300"
          >
            Inicio
          </Link>
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
            🛒 Carrito ({itemCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-brand-teal"
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
              <button
                onClick={handleLogout}
                className="text-left text-sm font-medium text-brand-purple"
              >
                🚪 Cerrar sesión
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
