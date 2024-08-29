"use client";
import { ButtonInput } from "@/components/form/FormInput";
import {
  createTicketInfo,
  updateEventsById,
} from "@/lib/actions/database.action";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const eventName = searchParams.get("event_name");

  useEffect(() => {
    const completeTicketProcessing = async () => {
      const eventId = localStorage.getItem("event_id");
      if (eventId && eventName) {
        try {
          await updateEventsById(eventId);
          await createTicketInfo({
            eventName,
            eventId,
            price: Number(amount),
          });
        } catch (error) {
          console.log(`An unexpected error occured: ${error}`);
        } finally {
          localStorage.removeItem("event_id");
        }
      }
    };

    completeTicketProcessing();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-4 max-w-[50rem] mx-auto text-center p-5">
      <FaRegCircleCheck className="text-emeraldGreen size-10" />
      <p className="font-semibold text-pretty">
        Payment Successful! 🎉 Thank you for your purchase. You have
        successfully bought a ticket to <br /> <b>{eventName}</b> for{" "}
        <b>{formatPrice(Number(amount))}</b>. <br />
        We look forward to seeing you there!
      </p>
      <Link href="/events">
        <ButtonInput variant="ticket" label="Back to Events" />
      </Link>
    </div>
  );
}
