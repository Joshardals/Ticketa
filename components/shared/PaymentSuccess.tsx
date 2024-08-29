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

export function PaymentSuccess() {
  return <div>PaymentSuccess</div>;
}