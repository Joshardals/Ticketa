"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";

export function EventsCard({
  event,
  onLike,
  hasLiked,
}: {
  event: any;
  onLike: (eventId: string) => void;
  hasLiked: boolean;
}) {
  return (
    <div
      key={event.$id}
      className=" bg-paleYellow rounded-lg p-2 shadow-lg text-pretty"
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

      <div className="mt-2 flex items-center space-x-1">
        <button title="Like Button" onClick={() => onLike(event.$id)}>
          {hasLiked ? (
            <IoIosHeart className="text-deepRed" />
          ) : (
            <IoIosHeartEmpty className="text-deepRed" />
          )}
        </button>
        <p className="text-xs">{event.likedEvents.length}</p>
      </div>

      <Link
        href={`/events/${event.eventId}`}
        className="text-emeraldGreen mt-4 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
