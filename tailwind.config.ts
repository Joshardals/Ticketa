import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Colors
        navyBlue: "#1D3557", // Use for: Primary buttons, headers, and key action items.
        deepRed: "#E63946", // Use for: Call-to-action buttons, alerts, and highlights.

        // Secondary Colors
        skyBlue: "#A8DADC", // Use for: Links, secondary buttons, and subtle highlights.
        paleYellow: "#F1FAEE", // Use for: Background accents, hover effects, and inactive elements.

        // Text Colors
        darkCharcoal: "#333333", // Use for: Primary text color for readability.
        coolGray: "#6D6875", // Use for: Secondary text, labels, and placeholders.

        // Accent Colors
        emeraldGreen: "#2A9D8F", // Use for: Success messages, active states, and links.
        sunsetOrange: "#FF9F1C", // Use for: Warnings, icons, and small accents.

        // Backgrounds & Borders:
        softWhite: "#F7FFF7", // Use for: Section backgrounds or as an alternative to snowy white.
        lightGray: "#EDEDED", // Use for: Borders, dividers, and subtle background areas.
      },

      fontFamily: {
        nunito: ["var(--font-nunito)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
