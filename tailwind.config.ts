import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        prime: {
          purple: "#C82AEF",
          accent: "#C82AEF",
          "accent-hover": "#B416DC",
          "accent-light": "#F6E4FC",
          "accent-glow": "rgba(200, 42, 239, 0.22)",
          navy: "#0C1322",
          "navy-dark": "#080B12",
          "navy-light": "#151F36",
          "navy-card": "#111A2E",
          "navy-border": "#262C3A",
          gray: "#C1C1C1",
          muted: "#6F7582",
          surface: {
            light: "#f9e9fe",
            dark: "#0C1322",
            black: "#080B12",
            card: "#111A2E",
          },
          border: {
            dark: "#262C3A",
            light: "rgba(255, 255, 255, 0.08)",
          },
        },
      },
      borderRadius: {
        card: "20px",
        control: "14px",
      },
      maxWidth: {
        content: "1360px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        accent: "0 0 35px -5px rgba(200, 42, 239, 0.35)",
        "accent-lg": "0 0 80px rgba(200, 42, 239, 0.22)",
        card: "0 24px 70px rgba(8, 11, 18, 0.12)",
        "card-dark": "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        "data-flow": "dataFlow 6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        dataFlow: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
