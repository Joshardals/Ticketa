"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export default function EventsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isEventDetailPage = pathname.startsWith("/events/");
  const isCheckoutPage = pathname.includes("/checkout");

  console.log(isCheckoutPage);
  return (
    <div
      className="flex items-center space-x-1 cursor-pointer py-5"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack />
      <span>{isEventDetailPage ? "Go to Events" : "Home"}</span>
    </div>
  );
}
