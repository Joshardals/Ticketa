"use client";
import { FaRegUser } from "react-icons/fa";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function EventsCard({ event }: { event: any }) {
  const isPastEvent = new Date(event.date) < new Date();
  return (
    <div
      key={event.$id}
      className={`bg-paleYellow rounded-lg p-2 shadow-lg text-pretty h-full ${
        isPastEvent ? "opacity-70" : ""
      }`}
    >
      <Image
        src={event.imgUrl}
        alt={event.title}
        width={500}
        height={500}
        className="rounded-lg h-40 object-cover mb-4"
      />
      <h2 className="font-bold text-xl">{event.title}</h2>
      <p className="text-coolGray mt-2 text-xs">
        {formatDate(event.date)} | {event.location}
      </p>
      <p className="text-coolGray text-xs mt-2">{event.description}</p>
      <div className="flex items-center jusify-center space-x-2 text-xs mt-2">
        <FaRegUser />
        <p className=" font-bold">
          {isPastEvent ? "Was Attended By" : "People Attending"}:{" "}
          {event.attendanceCount.length}
        </p>
      </div>
      <Link
        href={`/events/${event.eventId}`}
        className="text-emeraldGreen mt-4 inline-block"
      >
        {isPastEvent ? "View Event Details" : "View Details"}
      </Link>
    </div>
  );
}
