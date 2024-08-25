"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export default function EventsHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const isEventDetailPage = pathname.startsWith("/events/");
  return (
    <div
      className="flex items-center space-x-1 cursor-pointer py-5"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack />
      <span>{isEventDetailPage ? "Back to Events" : "Back Home"}</span>
    </div>
  );
}
