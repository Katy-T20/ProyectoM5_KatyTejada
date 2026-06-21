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
      },
    },
  },
  plugins: [],
};
