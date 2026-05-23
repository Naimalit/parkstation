import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f8ef",
          100: "#e4f0db",
          200: "#c9e1b8",
          300: "#a3cb8d",
          400: "#7cb362",
          500: "#5a9744",
          600: "#447834",
          700: "#365f2b",
          800: "#2d4c25",
          900: "#253f20",
        },
        cream: "#F5F0E8",
        bark: "#8B6914",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["system-ui", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
