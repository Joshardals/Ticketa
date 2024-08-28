"use client";
import { Checkout } from "@/components/(main)/Checkout";
import { usePathname } from "next/navigation";

export default function Checkoutpage() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  return <Checkout eventId={id} />;
}
