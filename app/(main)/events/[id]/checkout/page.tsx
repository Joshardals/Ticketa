import CheckoutContainer from "@/components/(main)/CheckoutContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Ticketa",
  description:
    "Complete your purchase and secure your ticket for the event. Review your order, enter payment details, and finalize your ticket booking. Thank you for choosing Ticketa!",
};

export default function Checkoutpage() {
  return <CheckoutContainer />;
}
