import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Vana pinnakatted.ee värviskeem: oliivroheline #abad16, lingid #999933 */
        primary: {
          50: "#f7f8e8",
          100: "#eef0c9",
          200: "#dce09a",
          300: "#c5cb5f",
          400: "#b0b63a",
          500: "#abad16",
          600: "#8f9112",
          700: "#6b6d0d",
          800: "#4a4c09",
          900: "#2d2e06",
        },
        brand: {
          DEFAULT: "#abad16",
          dark: "#32373c",
          link: "#999933",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
