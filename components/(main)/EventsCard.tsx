"use client"; // Indicates that this component should be rendered on the client side

import { FaRegUser } from "react-icons/fa"; // Importing user icon from react-icons
import { formatDate } from "@/lib/utils"; // Importing a utility function to format dates
import Image from "next/image"; // Importing Next.js's Image component for optimized images
import Link from "next/link"; // Importing Next.js's Link component for client-side navigation

/**
 * EventsCard component displays information about an event.
 * It takes an `event` object as a prop and renders the event details.
 * @param {Object} event - The event object containing event details.
 * @returns {JSX.Element} The rendered event card component.
 */
export function EventsCard({ event }: { event: any }) {
  // Determine if the event is in the past based on the event date
  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div
      key={event.$id} // Unique identifier for the event card
      className={`
        bg-paleYellow rounded-lg p-2 shadow-lg text-pretty h-full
        ${
          isPastEvent ? "opacity-70" : ""
        } // Apply opacity if the event is in the past
      `}
    >
      {/* Event image */}
      <Image
        src={event.imgUrl} // URL of the event image
        alt={event.title} // Alt text for the image
        width={500} // Fixed width for the image
        height={500} // Fixed height for the image
        className="rounded-lg h-40 object-cover mb-4" // Styling for the image
      />
      {/* Event title */}
      <h2 className="font-bold text-xl">{event.title}</h2>
      {/* Event date and location */}
      <p className="text-coolGray mt-2 text-xs">
        {formatDate(event.date)} | {event.location}{" "}
        {/* Display formatted date */}
        and location
      </p>
      {/* Event description */}
      <p className="text-coolGray text-xs mt-2">{event.description}</p>
      {/* Attendees or past attendees information */}
      <div className="flex items-center space-x-2 text-xs mt-2">
        <FaRegUser /> {/* Icon representing users */}
        <p className="font-bold">
          {isPastEvent ? "Was Attended By" : "People Attending"}:{" "}
          {event.attendanceCount.length} {/* Display number of attendees */}
        </p>
      </div>
      {/* Link to event details */}
      <Link
        href={`/events/${event.eventId}`} // Dynamic route to event details
        className="text-emeraldGreen mt-4 inline-block"
      >
        {isPastEvent ? "View Event Details" : "View Details"}{" "}
        {/* Conditional text based on event status */}
      </Link>
    </div>
  );
}
