// Import the CheckoutContainer component from the specified path.
// This component will be used to render the checkout page.
import CheckoutContainer from "@/components/(main)/CheckoutContainer";

// Import the Metadata type from "next" to define metadata for the page.
// Metadata is used to set SEO-related information like the page title and description.
import { Metadata } from "next";

// Define the metadata for the checkout page.
// This metadata includes the title and description that will be used for SEO and page identification.
export const metadata: Metadata = {
  title: "Checkout | Ticketa", // Title of the page, which appears in the browser tab and search results.
  description:
    "Complete your purchase and secure your ticket for the event. Review your order, enter payment details, and finalize your ticket booking. Thank you for choosing Ticketa!",
  // Description of the page, which provides additional context and is used by search engines and social media.
};

// Define and export the Checkoutpage function component.
// This component represents the checkout page of the application.
export default function Checkoutpage() {
  // Return the CheckoutContainer component to render the checkout page content.
  // The CheckoutContainer component is expected to handle the display of the checkout process.
  return <CheckoutContainer />;
}
