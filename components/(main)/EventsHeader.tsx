"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function EventsHeader() {
  const router = useRouter();
  return (
    <div
      className="flex items-center space-x-1 cursor-pointer p-5"
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack />
      <span>Home</span>
    </div>
  );
}
