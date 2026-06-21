import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border bg-dark-surface px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-brand-purple ${
          error ? "border-red-400" : "border-dark-border"
        }`}
        {...rest}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
