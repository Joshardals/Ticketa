"use client"; // Indicates that this component will be executed on the client-side (browser).

import { ButtonInput } from "@/components/form/FormInput"; // Imports a custom button component used for user interaction.
import {
  createTicketInfo, // Function to create ticket information in the database.
  updateEventsById, // Function to update event details in the database.
} from "@/lib/actions/database.action"; // Imports functions that interact with the database.
import { formatPrice } from "@/lib/utils"; // Utility function to format price values.
import Link from "next/link"; // Imports the Link component from Next.js for navigation.
import { useSearchParams } from "next/navigation"; // Hook to access query parameters from the URL.
import { useEffect } from "react"; // Imports useEffect hook for side effects.
import { FaRegCircleCheck } from "react-icons/fa6"; // Imports a checkmark icon from React Icons for visual confirmation.

export default function PaymentSuccess() {
  // Retrieves query parameters from the URL.
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // Extracts the amount from query parameters.
  const eventName = searchParams.get("event_name"); // Extracts the event name from query parameters.

  useEffect(() => {
    // Function to handle completion of ticket processing after payment.
    const completeTicketProcessing = async () => {
      // Retrieves the event ID stored in localStorage.
      const eventId = localStorage.getItem("event_id");
      // Check if eventId and eventName are available before proceeding.
      if (eventId && eventName) {
        try {
          // Update event details in the database.
          await updateEventsById(eventId);
          // Create ticket information in the database.
          await createTicketInfo({
            eventName, // Event name from the URL.
            eventId, // Event ID retrieved from localStorage.
            price: Number(amount), // Convert amount to a number for storage.
          });
        } catch (error) {
          // Logs any unexpected errors that occur during the process.
          console.log(`An unexpected error occurred: ${error}`);
        } finally {
          // Always remove the event ID from localStorage, regardless of success or failure.
          localStorage.removeItem("event_id");
        }
      }
    };

    // Call the function to complete ticket processing.
    completeTicketProcessing();
  }, [amount, eventName]); // Effect depends on amount and eventName; runs when these values change.

  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-4 max-w-[50rem] mx-auto text-center p-5">
      {/* Container styles: centers content, adds spacing, limits width, centers text, and adds padding. */}
      <FaRegCircleCheck className="text-emeraldGreen size-10" />{" "}
      {/* Success icon with styling. */}
      <p className="font-semibold text-pretty">
        {/* Display success message */}
        Payment Successful! 🎉 Thank you for your purchase. You have
        successfully bought a ticket to <br /> <b>{eventName}</b> for{" "}
        <b>{formatPrice(Number(amount))}</b>. <br />
        We look forward to seeing you there!
      </p>
      <Link href="/events">
        {/* Navigation button to return to events listing */}
        <ButtonInput variant="ticket" label="Back to Events" />
      </Link>
    </div>
  );
}
