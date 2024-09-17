"use client"; // This directive indicates that this code should run in the browser environment, not on the server.

import * as React from "react"; // Import the core React library for building UI components.
import * as LabelPrimitive from "@radix-ui/react-label"; // Import LabelPrimitive from Radix UI for handling label functionality.
import { cva, type VariantProps } from "class-variance-authority"; // Import 'cva' for handling class variations and 'VariantProps' for type definitions.

import { cn } from "@/lib/utils"; // Import a utility function for conditionally merging class names.

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  // Define a set of base styles for the label component.
  // - text-sm: Set the font size to small.
  // - font-medium: Apply medium font weight.
  // - leading-none: Set line height to 1 (no extra spacing).
  // - peer-disabled:cursor-not-allowed: Change cursor to 'not-allowed' when the label's associated input is disabled.
  // - peer-disabled:opacity-70: Reduce opacity to 70% when the label's associated input is disabled.
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // The type of the ref to be forwarded is the same as the underlying LabelPrimitive.Root element.
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // The component props will include all props of the LabelPrimitive.Root component.
    VariantProps<typeof labelVariants> // And variant props defined by the 'labelVariants'.
>(({ className, ...props }, ref) => (
  // Define a functional component with forwarding refs.
  // This component accepts className and other props, and merges them with base styles.
  <LabelPrimitive.Root
    ref={ref} // Forward the ref to the LabelPrimitive.Root component.
    className={cn(labelVariants(), className)} // Apply the base styles and merge any additional styles from className.
    {...props} // Spread any additional props to the LabelPrimitive.Root component.
  />
));
Label.displayName = LabelPrimitive.Root.displayName; // Set the display name of the component to match the underlying component's display name for easier debugging.

export { Label }; // Export the Label component for use in other parts of the application.
