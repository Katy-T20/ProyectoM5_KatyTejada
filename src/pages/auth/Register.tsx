import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getErrorMessage(code: string): string {
    if (code.includes("email-already-in-use")) {
      return "Este correo ya está registrado.";
    }
    if (code.includes("weak-password")) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (code.includes("invalid-email")) {
      return "El correo no es válido.";
    }
    return "Ocurrió un error al registrarte. Intenta de nuevo.";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password, displayName);
      navigate("/catalog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(getErrorMessage(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4">
      <div className="w-full max-w-sm rounded-2xl bg-dark-surface p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="displayName"
            label="Nombre completo"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" loading={loading}>
            Registrarme
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="font-medium text-brand-purple">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
