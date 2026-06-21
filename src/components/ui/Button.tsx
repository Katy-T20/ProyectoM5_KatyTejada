import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyles =
    "w-full rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

  const variantStyles =
    variant === "primary"
      ? "bg-brand-purple text-white hover:bg-brand-purple-dark"
      : "border border-brand-teal text-brand-teal hover:bg-brand-teal/10";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
