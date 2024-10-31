// Import necessary components and utilities for the EventPage component.
// - EventsHeader: The header component for displaying event-related navigation or information.
// - formatDate, formatPrice: Utility functions for formatting dates and prices.
// - checkIfHasTicket, getEventsById: Functions for interacting with the database to check tickets and fetch event data.
// - Image: Component for displaying images with Next.js optimization.
// - FaRegUser, FaCalendarCheck: Icons from the react-icons library for displaying user and calendar check icons.
// - ButtonInput: A button component used for form inputs, like ticket purchase buttons.
// - Link: Component for client-side navigation in Next.js.
import EventsHeader from "@/components/(main)/EventsHeader";
import { formatDate, formatPrice } from "@/lib/utils";
import { checkIfHasTicket, getEventsById } from "@/lib/actions/database.action";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { ButtonInput } from "@/components/form/FormInput";
import Link from "next/link";
import { Metadata } from "next";

// Define the metadata for the event page.
// This metadata includes the title and description for SEO and page identification purposes.
export const metadata: Metadata = {
  title: "Events | Ticketa", // Title of the page, shown in the browser tab and search results.
  description:
    "Explore upcoming student events on Ticketa. From lively parties to exciting concerts, find all the events you're interested in and secure your tickets. Browse through our curated list of events and make your plans today.",
  // Description of the page, used by search engines and social media platforms to display a summary.
};

// Define the EventPage function component as the default export of the file.
// This component displays the details of a specific event based on its ID.
export default async function EventPage({
  params: { id },
}: {
  params: { id: string }; // Props contain the event ID, which is used to fetch event details.
}) {
  // Fetch event details using the event ID.
  const { data } = await getEventsById(id);
  // Check if the user has a ticket for the event.
  const hasTicket = (await checkIfHasTicket(id)).msg;

  // If no event data is found, return null to render nothing.
  if (!data) return null;

  // Determine if the event is in the past by comparing the event date to the current date.
  const isPastEvent = new Date(data.date) < new Date();

  // Render the event details.
  return (
    <div className="maxCenter">
      <div className="max-sm:px-5">
        {/* Render the EventsHeader component */}
        <EventsHeader />
      </div>
      <div className="contentCenter">
        {/* Main container for the event details */}
        <div className="bg-paleYellow p-5 rounded-lg max-w-2xl space-y-4">
          {/* Event title */}
          <h1 className="text-2xl font-bold">{data.title}</h1>

          {/* Event image */}
          <Image
            src={data.imgUrl}
            width={500}
            height={500}
            alt={data.title}
            className="object-cover h-72 rounded-lg w-full"
          />

          {/* Event description */}
          <p className="text-pretty">{data.description}</p>

          <p>
            By: <b>{data.createdBy}</b>
          </p>

          {/* Event date */}
          <div className="flex items-center divide-x divide-coolGray space-x-2">
            <p>
              Date: <b>{formatDate(data.date)}</b>{" "}
              {/* Format and display the event date */}
            </p>
          </div>

          {/* Event location */}
          <p>
            Location: <b>{data.location}</b>
          </p>

          {/* Event category */}
          <p>
            Category: <b>{data.category}</b>
          </p>

          {/* Event status (past or upcoming) */}
          {isPastEvent && (
            <div className="flex items-center space-x-2">
              <FaCalendarCheck />
              <b className="text-deepRed">This event has ended.</b>
            </div>
          )}

          {/* Event price */}
          <p>
            Price: <b>{formatPrice(data.price)}</b>{" "}
            {/* Format and display the event price */}
          </p>

          {/* Attendance count or action based on event status */}
          <div className="flex items-center space-x-2">
            <FaRegUser />
            <p className="font-bold">
              {isPastEvent ? "Was Attended By" : "People Attending"}:{" "}
              <b>{data.attendanceCount.length}</b>{" "}
              {/* Display the count of attendees */}
            </p>
          </div>

          {/* Display ticket purchase or status based on whether the event is past or the user has a ticket */}
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
