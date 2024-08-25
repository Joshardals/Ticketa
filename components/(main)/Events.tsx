import { getEvents } from "@/lib/actions/database.action";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export async function Events() {
  const { data } = await getEvents();
  console.log(data);
  if (!data) return null;
  return (
    <div className="px-5 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
      {/* <EventsCard />
      <EventsCard /> */}

      {data.map((event, index) => (
        <div key={index}>
          <EventsCard event={event} />
        </div>
      ))}
    </div>
  );
}

export function EventsCard({ event }: { event: any }) {
  return (
    <div
      key={event.$id}
      className=" bg-lightGray rounded-lg p-2 shadow-lg text-pretty"
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
      <Link
        href={`/events/${event.eventId}`}
        className="text-emeraldGreen mt-4 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}
