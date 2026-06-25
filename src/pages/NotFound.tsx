import { Link } from "react-router-dom";

const PARTICLES = [
  {
    top: "18%",
    left: "12%",
    size: "14px",
    color: "bg-brand-purple",
    opacity: "opacity-50",
    delay: "",
  },
  {
    top: "30%",
    left: "78%",
    size: "10px",
    color: "bg-brand-teal",
    opacity: "opacity-60",
    delay: "[animation-delay:0.5s]",
  },
  {
    top: "65%",
    left: "16%",
    size: "18px",
    color: "bg-brand-teal",
    opacity: "opacity-40",
    delay: "[animation-delay:1s]",
  },
  {
    top: "72%",
    left: "82%",
    size: "12px",
    color: "bg-brand-purple",
    opacity: "opacity-50",
    delay: "[animation-delay:1.5s]",
  },
  {
    top: "14%",
    left: "88%",
    size: "8px",
    color: "bg-brand-purple",
    opacity: "opacity-60",
    delay: "[animation-delay:2s]",
  },
  {
    top: "80%",
    left: "45%",
    size: "10px",
    color: "bg-brand-teal",
    opacity: "opacity-50",
    delay: "[animation-delay:0.8s]",
  },
];

export function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${p.color} ${p.opacity} ${p.delay} animate-floatParticle`}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-4 text-8xl font-bold tracking-tight text-white sm:text-[140px]">
          <span>4</span>
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-teal shadow-[0_0_60px_rgba(155,93,229,0.35)] animate-float404 sm:h-28 sm:w-28">
            <span className="absolute -bottom-1 left-6 w-1 rounded-b-full bg-brand-purple animate-drip" />
            <span className="absolute -bottom-1 left-10 w-1 rounded-b-full bg-brand-teal animate-drip [animation-delay:0.7s]" />
            <span className="absolute -bottom-1 left-14 w-1 rounded-b-full bg-brand-purple animate-drip [animation-delay:1.4s]" />
          </span>
          <span>4</span>
        </div>

        <h1 className="mt-6 text-2xl font-medium text-white sm:text-3xl">
          ¡Esta página no está disponible!
        </h1>
        <p className="mt-3 max-w-md text-sm text-gray-400 sm:text-base">
          No encontramos lo que buscabas. Puede que el producto ya no esté
          disponible o la dirección haya cambiado.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg border border-brand-teal px-9 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-teal transition hover:bg-brand-teal hover:text-dark-bg"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
