import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  function getErrorMessage(code: string): string {
    if (
      code.includes("invalid-credential") ||
      code.includes("wrong-password")
    ) {
      return "Correo o contraseña incorrectos.";
    }
    if (code.includes("user-not-found")) {
      return "No existe una cuenta con este correo.";
    }
    if (code.includes("too-many-requests")) {
      return "Demasiados intentos. Probá de nuevo más tarde.";
    }
    return "Ocurrió un error al iniciar sesión. Intenta de nuevo.";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/catalog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(getErrorMessage(message));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate("/catalog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(getErrorMessage(message));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-dark-surface p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">
          Iniciar sesión
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" loading={loading}>
            Iniciar sesión
          </Button>

          <div className="rounded-lg border border-brand-teal/30 bg-brand-teal/10 px-3 py-2">
            <p className="text-xs text-brand-teal">
              <span className="font-semibold">Nota:</span> si te registraste o
              iniciaste sesión con Google, usá ese método para ingresar a tu
              cuenta.
            </p>
          </div>
        </form>
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-dark-border" />
          <span className="text-xs text-gray-500">o</span>
          <div className="h-px flex-1 bg-dark-border" />
        </div>

        <Button
          variant="secondary"
          loading={googleLoading}
          onClick={handleGoogleLogin}
        >
          Continuar con Google
        </Button>

        <p className="mt-4 text-center text-sm text-gray-400">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="font-medium text-brand-purple">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
