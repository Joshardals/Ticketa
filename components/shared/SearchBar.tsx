"use client"; // Indicates that this component should be rendered on the client side

import { IoSearchSharp } from "react-icons/io5"; // Import the search icon from react-icons
import { Input } from "../ui/input"; // Import the Input component for text input
import { SearchQuery } from "@/lib/store"; // Import the custom hook or function for managing search query state

/**
 * SearchBar component provides a text input field for searching events.
 * It includes a search icon and updates the search query state on input changes.
 * @returns {JSX.Element} The rendered search bar component.
 */
export function SearchBar() {
  // Destructure `setQuery` from the SearchQuery hook
  const { setQuery } = SearchQuery();

  return (
    <div className="relative cursor-pointer sm:w-[280px]">
      {/* Input field for entering search queries */}
      <Input
        type="text" // Specifies that the input field is for text input
        placeholder="Search for Events" // Placeholder text displayed when input is empty
        className="bg-paleYellow" // Applies background color using Tailwind CSS
        onChange={(e) => setQuery(e.target.value)} // Updates the search query state on input change
      />

      {/* Container for the search icon */}
      <div className="absolute top-0 right-0 h-full flex items-center px-1 rounded-md bg-paleYellow">
        {/* Search icon */}
        <IoSearchSharp className="size-5 text-darkCharcoal" />{" "}
        {/* Icon size and color */}
      </div>
    </div>
  );
}
