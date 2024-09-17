import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { BASE_URL, formatPrice, formatSubCurrency } from "@/lib/utils";
import { ButtonInput } from "../form/FormInput";
import { updateEventsById } from "@/lib/actions/database.action";
import Link from "next/link";
import { CheckoutSkeleton } from "../ui/skeletons/CheckoutSkeleton";

// The Checkout component handles the payment process for an event
export function Checkout({ amount, event }: { amount: number; event: any }) {
  console.log(event.date);
  // `useStripe` gives access to the Stripe object
  const stripe = useStripe();
  // `useElements` gives access to the elements object which is used to handle Stripe Elements
  const elements = useElements();

  // State to manage error messages from Stripe
  const [errorMessage, setErrorMessage] = useState<string>();
  // State to store the client secret, which is needed to confirm the payment
  const [clientSecret, setClientSecret] = useState("");
  // State to manage loading state while processing payment
  const [loading, setLoading] = useState(false);

  // `useEffect` runs when the component mounts or when the `amount` changes
  useEffect(() => {
    // Fetches a new payment intent from the server when amount changes
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        // Sets the content type to JSON
        "Content-Type": "application/json",
      },
      // Sends the amount to the server in JSON format
      body: JSON.stringify({ amount: formatSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Sets the client secret obtained from the server response
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevents the default form submission behavior
    e.preventDefault();
    // Sets loading state to true to show a loading indicator
    setLoading(true);

    // Checks if Stripe and elements are properly loaded
    if (!stripe || !elements) {
      // If not loaded, stop processing
      return;
    }

    try {
      // Stores the event ID in local storage for reference
      localStorage.setItem("event_id", event.eventId);

      // Submits the payment elements to Stripe
      const { error: submitError } = await elements.submit();

      // Handles errors from the payment submission
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      console.log("Payment submitted successfully, confirming payment...");

      // Confirms the payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Redirects to this URL after payment confirmation
          return_url: `${BASE_URL}/payment-success?amount=${amount}&event_name=${event.title}&event_date=${event.date}`,
        },
      });

      // Handles errors from payment confirmation
      if (error) {
        console.error("Payment Error:", error.message);
        setErrorMessage(error.message);
      } else {
        console.log("Payment confirmed successfully!");
      }
    } catch (error: any) {
      // Handles unexpected errors
      console.error("Unexpected error during payment:", error.message);
      setErrorMessage(error.message);
    } finally {
      // Resets loading state after processing is complete
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      {/* Shows the payment form if client secret is available */}
      {clientSecret ? (
        <>
          <PaymentElement />
          <div className="mt-4 flex items-center max-sm:flex-col gap-2">
            {/* Button to complete the payment */}
            <ButtonInput
              label={`Complete Payment: ${formatPrice(amount)}`}
              loading={loading}
              variant={"ticket"}
            />
            {/* Link to return to the events page */}
            <Link href="/events" className="w-full">
              <ButtonInput
                label={`Return to Events`}
                loading={loading}
                variant={"home"}
              />
            </Link>
          </div>
        </>
      ) : (
        <CheckoutSkeleton /> // Shows a skeleton loader while the payment form is loading
      )}

      {/* Displays error messages if any */}
      {errorMessage && (
        <div className="text-center text-deepRed text-sm">{errorMessage}</div>
      )}
    </form>
  );
}
