import * as React from "react"; // Import the core React library for building UI components.

import { cn } from "@/lib/utils"; // Import a utility function for conditional class name merging.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
// Define the props that the Input component will accept.
// This extends the standard HTML input attributes to include additional props.

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // Create a functional component named "Input" using React.forwardRef.
  // This allows the component to forward refs to the underlying HTML input element.
  ({ className, type, ...props }, ref) => {
    // Destructure the props to extract className, type, and other props.
    // `ref` is used to forward the reference to the HTML input element.

    return (
      <input
        type={type} // Set the type of the input field (e.g., text, password).
        className={cn(
          "flex h-10 w-full rounded-md bg-softWhite px-3 py-2 text-sm placeholder:text-coolGray outline-none border border-lightGray",
          className
        )}
        // Apply styling to the input field:
        // - flex: Use flexbox layout.
        // - h-10: Set the height to 2.5rem (40px).
        // - w-full: Set the width to 100% of the container.
        // - rounded-md: Apply medium border radius for rounded corners.
        // - bg-softWhite: Set the background color to a soft white.
        // - px-3: Apply padding of 0.75rem (12px) horizontally.
        // - py-2: Apply padding of 0.5rem (8px) vertically.
        // - text-sm: Set the font size to small.
        // - placeholder:text-coolGray: Set the placeholder text color.
        // - outline-none: Remove default focus outline.
        // - border: Apply a border.
        // - border-lightGray: Set the border color to light gray.
        // The `cn` function is used to conditionally merge class names, allowing for custom styling via `className`.

        ref={ref} // Forward the ref to the HTML input element.
        {...props} // Spread remaining props to the HTML input element (e.g., placeholder, value, onChange).
      />
    );
  }
);
Input.displayName = "Input"; // Set the display name for the component to aid in debugging and development tools.

export { Input }; // Export the Input component for use in other parts of the application.
