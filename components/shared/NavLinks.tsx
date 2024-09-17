"use client";
// Import necessary modules and components
import { navLinks } from "@/lib/data"; // Import navigation link data
import Link from "next/link"; // Import the Link component for client-side navigation
import { SearchBar } from "./SearchBar"; // Import the SearchBar component
import { usePathname } from "next/navigation"; // Hook to get the current pathname

/**
 * NavLinks component renders the navigation links for larger screens.
 * It uses client-side navigation and highlights the current page.
 */
export function NavLinks() {
  // Get the current pathname from the URL
  const pathname = usePathname();

  return (
    <div
      className="
        flex-1 flex items-center justify-evenly max-sm:hidden text-softWhite
      "
    >
      {/* Navigation container */}
      <nav className="max-md:hidden">
        <ul
          className="
            flex items-center space-x-8
          "
        >
          {/* Iterate over navLinks and render each link */}
          {navLinks.map((item, index) => {
            const { label, href } = item; // Destructure label and href from each item

            return (
              <li
                key={index} // Use index as the key for list items
                className={`
                  hover:text-sunsetOrange transition-all duration-300 ease-linear
                  ${
                    pathname === href && "text-sunsetOrange"
                  } // Highlight active link
                `}
              >
                {/* Link component for client-side navigation */}
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
