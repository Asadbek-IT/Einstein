import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#F5F0E8",
        ink: "#0D0D0D",
        sepia: "#8B7355",
        gold: "#C9A84C",
        muted: "#6B6459",
      },
      letterSpacing: {
        widest2: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
