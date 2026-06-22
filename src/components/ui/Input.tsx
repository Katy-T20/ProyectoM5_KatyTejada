import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, type, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`w-full rounded-lg border bg-dark-surface px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-brand-purple ${
            isPassword ? "pr-10" : ""
          } ${error ? "border-red-400" : "border-dark-border"}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-200"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
