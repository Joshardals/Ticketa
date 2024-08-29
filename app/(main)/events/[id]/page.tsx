import EventsHeader from "@/components/(main)/EventsHeader";
import { formatDate, formatPrice } from "@/lib/utils";
import { checkIfHasTicket, getEventsById } from "@/lib/actions/database.action";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { ButtonInput } from "@/components/form/FormInput";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Ticketa",
  description:
    "Explore upcoming student events on Ticketa. From lively parties to exciting concerts, find all the events you're interested in and secure your tickets. Browse through our curated list of events and make your plans today.",
};

export default async function EventPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await getEventsById(id);
  const hasTicket = (await checkIfHasTicket(id)).msg;
  if (!data) return null;

  const isPastEvent = new Date(data.date) < new Date();

  return (
    <div className="maxCenter">
      <div className="max-sm:px-5">
        <EventsHeader />
      </div>
      <div className="contentCenter">
        <div className="bg-paleYellow p-5 rounded-lg max-w-2xl space-y-4">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <Image
            src={data.imgUrl}
            width={500}
            height={500}
            alt={data.title}
            className="object-cover h-72 rounded-lg w-full"
          />
          <p className="text-pretty">{data.description}</p>
          <div className="flex items-center divide-x divide-coolGray space-x-2">
            <p>
              Date: <b>{formatDate(data.date)}</b>
            </p>
          </div>
          <p>
            Location: <b>{data.location}</b>
          </p>
          <p>
            Category: <b>{data.category}</b>
          </p>
          {isPastEvent && (
            <div className="flex items-center space-x-2">
              <FaCalendarCheck />
              <b className="text-deepRed">This event has ended.</b>
            </div>
          )}
          <p>
            Price: <b>{formatPrice(data.price)}</b>
          </p>

          <div className="flex items-center jusify-center space-x-2">
            <FaRegUser />
            <p className="font-bold">
              {isPastEvent ? "Was Attended By" : "People Attending"}:{" "}
              <b>{data.attendanceCount.length}</b>
            </p>
          </div>
          {!isPastEvent &&
            (!hasTicket ? (
              <div>
                <Link href={`/events/${id}/checkout`}>
                  <ButtonInput label="Buy Ticket" variant="ticket" />
                </Link>
              </div>
            ) : (
              <div>
                <ButtonInput
                  label="Ticket Purchased"
                  variant="ticket"
                  disabled={hasTicket}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
