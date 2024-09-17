// Import the Nunito Sans font from Google Fonts using the "next/font/google" module.
// This provides a way to include Google Fonts with customization options.
import { Nunito_Sans } from "next/font/google";

// Import global CSS styles from the "globals.css" file.
// This file contains global styles that apply to the entire application.
import "./globals.css";

// Configure the Nunito Sans font with specific options.
// `subsets` specifies the character subsets to include (e.g., Latin characters).
// `weight` defines the available font weights.
// `display` controls how the font is displayed (e.g., swap ensures text is visible while the font loads).
// `variable` sets a CSS variable name to use for applying this font.
const nunito = Nunito_Sans({
  subsets: ["latin"], // Include Latin characters
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"], // Define font weights available for use
  display: "swap", // Use the swap strategy to show fallback text until the font loads
  variable: "--font-nunito", // CSS variable name for the font
});

// Define viewport settings for responsive design.
// These settings control the initial scaling and user zoom capabilities on mobile devices.
export const viewport = {
  width: "device-width", // Set the viewport width to the device's width
  initialScale: 1, // Set the initial zoom level to 1
  maximumScale: 1, // Restrict zooming to a maximum scale of 1
  userScalable: "0", // Disable user scaling (zooming) on the page
};

// Define and export the RootLayout function component.
// This component is used as the root layout for the application, wrapping all other components.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Define the type of "children" prop as React.ReactNode, which represents any valid React element.
}>) {
  // Return the TSX structure that wraps the application's content.
  // This sets up the HTML and body tags, applying global styles and the Nunito font.
  return (
    <html lang="en">
      {" "}
      {/* Set the language attribute of the HTML document to English */}
      <body className={`${nunito.variable}`}>
        {" "}
        {/* Apply the Nunito font variable to the body */}
        <div>{children}</div> {/* Render the children elements inside a div */}
      </body>
    </html>
  );
}
