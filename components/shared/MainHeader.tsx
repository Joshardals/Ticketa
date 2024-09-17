// Import necessary components for navigation and user profile functionalities
import { NavLinks } from "./NavLinks"; // Component for navigation links
import { UserProfile } from "./UserProfile"; // Component for user profile actions

/**
 * MainHeader component represents the top navigation bar of the application.
 * It includes the application logo, navigation links, and user profile section.
 */
export function MainHeader() {
  return (
    // Header element with styling for layout and positioning
    <header
      className="
        absolute right-0 left-0 p-5 maxCenter flex gap-2 max-sm:gap-4 
        justify-between items-center select-none z-10
      "
    >
      {/* Logo section of the header */}
      <h1
        className="
          text-2xl font-extrabold max-w-[fit-content] text-softWhite
        "
      >
        {/* Application name with styling */}
        Ticketa
        {/* Accent color for part of the name */}
        <span className="text-deepRed">.</span>
      </h1>

      {/* Navigation Links */}
      {/* This component contains links to different pages or sections of the application */}
      <NavLinks />

      {/* User Profile Section */}
      {/* This component includes user-specific actions like viewing the profile or logging out */}
      <UserProfile />
    </header>
  );
}
