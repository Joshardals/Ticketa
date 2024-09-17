import type { Config } from "tailwindcss";

// Tailwind CSS configuration object
const config: Config = {
  // Enable dark mode using a class-based strategy
  darkMode: ["class"],

  // Define the content paths to be scanned by Tailwind for class names
  content: [
    "./pages/**/*.{ts,tsx}", // Scan TypeScript files in the pages directory
    "./components/**/*.{ts,tsx}", // Scan TypeScript files in the components directory
    "./app/**/*.{ts,tsx}", // Scan TypeScript files in the app directory
    "./src/**/*.{ts,tsx}", // Scan TypeScript files in the src directory
  ],

  // No prefix for Tailwind utility classes
  prefix: "",

  theme: {
    // Configuration for container elements
    container: {
      center: true, // Center the container horizontally
      padding: "2rem", // Apply padding of 2rem on all sides
      screens: {
        "2xl": "1400px", // Set max-width for 2xl screens to 1400px
      },
    },

    extend: {
      // Custom color palette
      colors: {
        // Primary Colors
        navyBlue: "#1D3557", // Primary color for buttons, headers, and key action items
        deepRed: "#E63946", // Color for call-to-action buttons, alerts, and highlights

        // Secondary Colors
        skyBlue: "#A8DADC", // Color for links, secondary buttons, and subtle highlights
        paleYellow: "#F1FAEE", // Background accents, hover effects, and inactive elements

        // Text Colors
        darkCharcoal: "#333333", // Primary text color for readability
        coolGray: "#6D6875", // Secondary text, labels, and placeholders

        // Accent Colors
        emeraldGreen: "#2A9D8F", // Success messages, active states, and links
        sunsetOrange: "#FF9F1C", // Warnings, icons, and small accents

        // Backgrounds & Borders
        softWhite: "#F7FFF7", // Section backgrounds or alternative to snowy white
        lightGray: "#EDEDED", // Borders, dividers, and subtle background areas
      },

      // Extend font families with custom fonts
      fontFamily: {
        nunito: ["var(--font-nunito)"], // Custom font-family using a CSS variable
      },

      // Define custom keyframes for animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" }, // Starting height for the accordion down animation
          to: { height: "var(--radix-accordion-content-height)" }, // Ending height for the accordion down animation
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" }, // Starting height for the accordion up animation
          to: { height: "0" }, // Ending height for the accordion up animation
        },
      },

      // Extend animation properties with custom animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Animation for accordion opening
        "accordion-up": "accordion-up 0.2s ease-out", // Animation for accordion closing
      },
    },
  },

  // Include Tailwind CSS animate plugin for additional animations
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
