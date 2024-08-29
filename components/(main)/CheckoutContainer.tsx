"use client";
import { Checkout } from "@/components/(main)/Checkout";

import {
  checkIfHasTicket,
  getEventsById,
} from "@/lib/actions/database.action";
import { formatPrice, formatSubCurrency } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { UserEventModel } from "@/typings";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutContainer() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const isInitialMount = useRef(true);
  const [event, setEvent] = useState<UserEventModel | null>();
  const [hasTicket, setHasTicket] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isInitialMount.current) {
      // Skip the first render
      isInitialMount.current = false;
      return;
    }

    const fetchEventDetails = async () => {
      try {
        setLoading(true);

        const [eventResponse, ticketResponse] = await Promise.all([
          getEventsById(id),
          checkIfHasTicket(id),
        ]);

        if (!ticketResponse || !eventResponse) return null;

        setEvent(eventResponse.data);
        setHasTicket(ticketResponse.msg);
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  useEffect(() => {
    if (hasTicket === true) router.push("/events");
  }, [router, hasTicket]);

  if (!event) return null;

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full">
      <div className="maxCenter mb-4">
        <h2 className="font-bold text-2xl">
          Your Total: {formatPrice(event.price)}
        </h2>
      </div>

      <div className="w-full max-w-[50rem]">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: formatSubCurrency(event.price), // cents
            currency: "usd",
          }}
        >
          <Checkout amount={event.price} event={event} />
        </Elements>
      </div>
    </div>
  );
}
