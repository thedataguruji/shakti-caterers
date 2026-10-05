import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8ed",
          100: "#ffeccf",
          200: "#ffd79f",
          300: "#ffbb63",
          400: "#ff9a2e",
          500: "#fb7d10",
          600: "#ec6107",
          700: "#c44808",
          800: "#9c380f",
          900: "#7e300f",
        },
        brand: {
          50: "#fbf1e6",
          100: "#f6dfc4",
          200: "#eec393",
          300: "#e2a062",
          400: "#d17e3a",
          500: "#bd6620",
          600: "#a85b1a",
          700: "#8f4d17",
          800: "#764012",
          900: "#5a310d",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
