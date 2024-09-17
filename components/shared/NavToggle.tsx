"use client"; // Indicates that this component should be rendered on the client side

import { MouseEvent } from "react"; // Import MouseEvent type for event typing
import { UserActionToggle } from "@/lib/store"; // Import a custom hook or function for managing navigation state

/**
 * NavToggle component is a button used to toggle the visibility of the navigation menu.
 * It is only displayed on medium and smaller screens.
 * @returns {JSX.Element} The rendered navigation toggle button component.
 */
export function NavToggle() {
  // Destructure `open` and `setOpen` from the UserActionToggle hook
  const { open, setOpen } = UserActionToggle();

  /**
   * Handle click events for the navigation toggle button.
   * Toggles the `open` state, which controls the visibility of the navigation menu.
   * @param {MouseEvent<HTMLButtonElement>} e - The click event object.
   */
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault(); // Prevents the default button click behavior
    setOpen(!open); // Toggles the `open` state
  };

  return (
    <button
      type="button" // Specifies that this button is a clickable element
      className="navToggle md:hidden" // Applies styling for the toggle button
      onClick={handleClick} // Sets the click event handler
      aria-label="Toggle Navigation" // Provides an accessible label for screen readers
    >
      {/* Three spans to represent the lines in the toggle button */}
      <span className={`bg-softWhite ${open && "active"}`}></span>
      <span className={`bg-softWhite ${open && "active"}`}></span>
      <span className={`bg-softWhite ${open && "active"}`}></span>
    </button>
  );
}
