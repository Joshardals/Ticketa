"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export default function EventsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isEventDetailPage = pathname.startsWith("/events/");
  const isCheckoutPage = pathname.includes("/checkout");

  return (
    <div
      className="flex items-center space-x-1 cursor-pointer py-5"
      onClick={() => {
        if (isEventDetailPage) {
          router.push("/events");
        } else {
          router.push("/home");
        }
      }}
    >
      <IoMdArrowRoundBack />
      <span>
        {isEventDetailPage ? "Go to Events" : isCheckoutPage ? "Back" : "Home"}
      </span>
    </div>
  );
}
