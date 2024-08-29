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

export default function PaymentSuccessPage() {
  return <PaymentSuccessPage />;
}

export function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const eventName = searchParams.get("event_name");
  return <div>Hey there</div>;
}
