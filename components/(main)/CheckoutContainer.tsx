"use client"; // Indicates that this file should be processed on the client side only

import { Checkout } from "@/components/(main)/Checkout"; // Imports the Checkout component from a specific path

import { checkIfHasTicket, getEventsById } from "@/lib/actions/database.action"; // Imports functions to check if a user has a ticket and to get event details
import { formatPrice, formatSubCurrency } from "@/lib/utils"; // Imports utility functions to format prices
import { loadStripe } from "@stripe/stripe-js"; // Imports function to load Stripe.js
import { Elements } from "@stripe/react-stripe-js"; // Imports Elements component to integrate Stripe Elements
import { UserEventModel } from "@/typings"; // Imports TypeScript type for user event model
import { usePathname, useRouter } from "next/navigation"; // Imports hooks from Next.js for routing and path handling
import { useEffect, useRef, useState } from "react"; // Imports React hooks for managing component state and side effects

// Checks if the Stripe public key is defined in environment variables
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined"); // Throws an error if the public key is not defined
}

// Loads Stripe with the public key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutContainer() {
  // Gets the current pathname from the router
  const pathname = usePathname();
  // Extracts the event ID from the pathname
  const id = pathname.split("/")[2];
  // State to store event details
  const [event, setEvent] = useState<UserEventModel | null>(null);
  // State to check if the user has a ticket
  const [hasTicket, setHasTicket] = useState<boolean | undefined>();
  // State to manage loading state
  const [loading, setLoading] = useState(false);
  // Gets the router object for navigation
  const router = useRouter();

  // Effect to fetch event details and ticket status when the component mounts
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true); // Sets loading state to true while fetching

        // Fetches event details and ticket status concurrently
        const [eventResponse, ticketResponse] = await Promise.all([
          getEventsById(id), // Gets event details by ID
          checkIfHasTicket(id), // Checks if the user has a ticket for the event
        ]);

        // If either response is missing, do nothing
        if (!ticketResponse || !eventResponse) return null;

        // Sets the event details and ticket status in state
        setEvent(eventResponse.data);
        setHasTicket(ticketResponse.msg);
      } catch (error: any) {
        // Logs any error that occurs during the fetch
        console.log(`Error: ${error.message}`);
      } finally {
        // Sets loading state to false once fetching is complete
        setLoading(false);
      }
    };

    fetchEventDetails(); // Calls the function to fetch event details
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Effect to redirect the user if they already have a ticket
  useEffect(() => {
    if (hasTicket === true) router.push("/events"); // Redirects to the events page if the user has a ticket
  }, [router, hasTicket]); // Runs when `router` or `hasTicket` changes

  // If event data is not available, render nothing
  if (!event) return null;

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full">
      {/* Container for total price */}
      <div className="maxCenter mb-4">
        <h2 className="font-bold text-2xl">
          Your Total: {formatPrice(event.price)}{" "}
          {/* Displays the formatted price */}
        </h2>
      </div>

      {/* Container for the Stripe Elements checkout form */}
      <div className="w-full max-w-[50rem]">
        <Elements
          stripe={stripePromise} // Passes the Stripe instance to Elements
          options={{
            mode: "payment", // Sets the mode to payment
            amount: formatSubCurrency(event.price), // Sets the amount in cents for Stripe
            currency: "usd", // Sets the currency to USD
          }}
        >
          <Checkout amount={event.price} event={event} />{" "}
          {/* Renders the Checkout component with event details */}
        </Elements>
      </div>
    </div>
  );
}
