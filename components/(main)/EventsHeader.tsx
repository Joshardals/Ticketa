"use client"; // This directive ensures the component is executed in the browser, enabling client-side rendering.

import { IoMdArrowRoundBack } from "react-icons/io"; // Imports an arrow icon from React Icons to use as a back navigation button.
import { usePathname, useRouter } from "next/navigation"; // Imports hooks from Next.js for navigation and path management.

export default function EventsHeader() {
  // Retrieves the current pathname (URL) from the router.
  const pathname = usePathname();
  // Provides methods for programmatic navigation.
  const router = useRouter();

  // Determines if the current page is an event detail page by checking if the pathname starts with "/events/".
  const isEventDetailPage = pathname.startsWith("/events/");
  // Determines if the current page is the checkout page by checking if the pathname includes "/checkout".
  const isCheckoutPage = pathname.includes("/checkout");

  return (
    <div
      className="flex items-center space-x-1 cursor-pointer py-5" // Styles the container with flexbox, spacing, a pointer cursor, and padding.
      onClick={() => {
        // Handles click events on the header.
        if (isEventDetailPage) {
          // If the current page is an event detail page, navigate back to the events listing page.
          router.push("/events");
        } else {
          // Otherwise, navigate back to the home page.
          router.push("/home");
        }
      }}
    >
      <IoMdArrowRoundBack /> {/* Displays the back arrow icon. */}
      <span>
        {/* Displays a label based on the current page */}
        {isEventDetailPage
          ? "Go to Events" // If on an event detail page, show "Go to Events".
          : isCheckoutPage
          ? "Back" // If on the checkout page, show "Back".
          : "Home"}{" "}
        {/* For all other pages, show "Home". */}
      </span>
    </div>
  );
}
