// Import the Link component from Next.js for client-side navigation
import Link from "next/link";

/**
 * Header component represents the top navigation section of the page.
 * It includes the application logo and is fixed at the top of the viewport.
 */
export function Header() {
  return (
    // The header element with styling for layout and appearance
    <header
      className="
        p-5 maxCenter fixed left-0 right-0 top-0 bg-softWhite
      "
    >
      {/* Link component for client-side navigation to the home page */}
      <Link href="/">
        {/* Main logo text */}
        <h1
          className="
            text-2xl font-extrabold
          "
        >
          {/* Application name with styling */}
          Ticketa
          {/* Accent color for part of the name */}
          <span className="text-deepRed">.</span>
        </h1>
      </Link>
    </header>
  );
}
