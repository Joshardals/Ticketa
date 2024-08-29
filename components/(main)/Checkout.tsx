import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatPrice, formatSubCurrency } from "@/lib/utils";
import { ButtonInput } from "../form/FormInput";
import { updateEventsById } from "@/lib/actions/database.action";
import Link from "next/link";
import { CheckoutSkeleton } from "../ui/skeletons/CheckoutSkeleton";

export function Checkout({ amount, event }: { amount: number; event: any }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify({ amount: formatSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      localStorage.setItem("event_id", event.eventId);

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      console.log("Payment submitted successfully, confirming payment...");

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-success?amount=${amount}&event_name=${event.title}`,
        },
      });

      if (error) {
        console.error("Payment Error:", error.message);
        setErrorMessage(error.message);
      } else {
        console.log("Payment confirmed successfully!");
      }
    } catch (error: any) {
      console.error("Unexpected error during payment:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      {clientSecret ? (
        <>
          <PaymentElement />
          <div className="mt-4 flex items-center max-sm:flex-col gap-2">
            <ButtonInput
              label={`Complete Payment: ${formatPrice(amount)}`}
              loading={loading}
              variant={"ticket"}
            />
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
        <CheckoutSkeleton />
      )}

      {errorMessage && (
        <div className="text-center text-deepRed text-sm">{errorMessage}</div>
      )}
    </form>
  );
}
