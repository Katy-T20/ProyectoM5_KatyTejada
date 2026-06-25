/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0F0F12",
          surface: "#1C1C22",
          border: "#2A2A30",
        },
        brand: {
          purple: "#9B5DE5",
          "purple-dark": "#7C3FC4",
          teal: "#5EE6D0",
        },
        admin: {
          indigo: "#4F5BD5",
          "indigo-dark": "#3D47B0",
        },
      },
      keyframes: {
        float404: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        drip: {
          "0%": { height: "0px", opacity: "0.8" },
          "100%": { height: "44px", opacity: "0" },
        },
        floatParticle: {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.5" },
          "50%": { transform: "translate(10px, -24px)", opacity: "1" },
        },
      },
      animation: {
        float404: "float404 3.5s ease-in-out infinite",
        drip: "drip 2.2s ease-in infinite",
        floatParticle: "floatParticle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
