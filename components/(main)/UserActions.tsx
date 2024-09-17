"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Imports components for creating a dropdown menu from a UI library or custom components.
import { signOutUser } from "@/lib/actions/auth.action"; // Imports the function to handle user sign-out.
import { navLinks } from "@/lib/data"; // Imports navigation link data.
import Link from "next/link"; // Imports the Link component for client-side navigation.
import { usePathname } from "next/navigation"; // Imports hook to get the current pathname (though not used here).
import { useState } from "react"; // Imports useState for managing component state.

export function UserActions({ initials }: { initials: string }) {
  const [loading, setLoading] = useState<boolean | null>(false); // State to track loading status during sign-out.

  const handleLogout = async () => {
    try {
      setLoading(true); // Set loading to true to indicate the sign-out process has started.
      await signOutUser(); // Call the function to sign out the user.
    } catch (error: any) {
      console.log(`Error: ${error.message}`); // Log any errors encountered during sign-out.
    } finally {
      setLoading(false); // Set loading to false once sign-out is complete or if an error occurs.
    }
  };

  return (
    <DropdownMenu>
      {/* DropdownMenu component acts as a container for dropdown functionality. */}
      <DropdownMenuTrigger className="rounded-full max-sm:w-full flex justify-end">
        {/* DropdownMenuTrigger component to toggle the visibility of the dropdown menu. */}
        <div
          className={`cursor-pointer transition-all duration-100 ease-linear bg-emeraldGreen border-0 hover:border-2 hover:border-sunsetOrange rounded-full size-10 text-softWhite flex items-center justify-center`}
          // Styling for the trigger element, including a transition effect, background color, hover effect, and rounded corners.
        >
          {initials}
          {/* Display user initials inside the trigger element. */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-sm:ml-48">
        {/* DropdownMenuContent component contains the content displayed in the dropdown menu. */}
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* DropdownMenuLabel component to add a label or title to the dropdown menu. */}
        <DropdownMenuSeparator />
        {/* DropdownMenuSeparator component to add a separator line between menu items. */}

        {navLinks.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`${
              item.label === "Home" || item.label === "Explore Events"
                ? "hidden"
                : ""
            }`}
            // Conditionally hide menu items with labels "Home" and "Explore Events".
          >
            <Link href={item.href}>{item.label}</Link>
            {/* DropdownMenuItem component for each menu item, wrapped in a Link component for navigation. */}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem onClick={handleLogout}>
          Logout
          {/* DropdownMenuItem component for the logout action, triggering handleLogout function on click. */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
