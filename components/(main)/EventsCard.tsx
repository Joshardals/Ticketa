"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { updateEventsById } from "@/lib/actions/database.action";
import { useRouter } from "next/navigation";

export function EventsCard({ event }: { event: any }) {
  const router = useRouter();
  const handleLike = async (e: any) => {
    e.preventDefault();

    try {
      const response = await updateEventsById(event.$id);
      if (response?.success) {
        router.refresh();
      }
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  };
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
        <button title="Like Button" onClick={handleLike}>
          <IoIosHeartEmpty className="text-deepRed" />
        </button>
        <p>{event.likesCount}</p>
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
