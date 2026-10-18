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
        maroon: {
          DEFAULT: "#65152F",
          dark: "#3B0A1B",
          light: "#7D1B3B",
          deep: "#260611",
        },
        magenta: {
          DEFAULT: "#A21E58",
          light: "#BE276B",
          dark: "#7A1440",
        },
        gold: {
          DEFAULT: "#C4A46C",
          light: "#DFCA9B",
          dark: "#9E804B",
          hairline: "rgba(196, 164, 108, 0.4)",
          glow: "rgba(196, 164, 108, 0.15)",
        },
        ivory: {
          DEFAULT: "#F7F1E8",
          dark: "#ECE3D4",
          light: "#FAF7F2",
          card: "#FFFFFF",
        },
        charcoal: {
          DEFAULT: "#241C1D",
          muted: "#5C5052",
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "serif"],
        sans: ["Montserrat", "Lato", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        luxury: "0.15em",
      },
      animation: {
        "gold-shimmer": "shimmer 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
