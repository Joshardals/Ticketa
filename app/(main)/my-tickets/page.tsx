// Import necessary components and utilities for the TicketsPage component.
// - EventsHeader: Component displaying the header for the events section.
// - TableInput: Component for rendering a table of tickets with various details.
// - UserProfile: Component showing user profile information or actions.
// - getCurrentUserTicket: Function for fetching the current user's tickets from the database.
import EventsHeader from "@/components/(main)/EventsHeader";
import { TableInput } from "@/components/(main)/TableInput";
import { UserProfile } from "@/components/shared/UserProfile";
import { getCurrentUserTicket } from "@/lib/actions/database.action";
import { Metadata } from "next";

// Define metadata for the page, including the title and description displayed in the browser tab and search engines.
export const metadata: Metadata = {
  title: "My Tickets | Ticketa",
  description:
    "View and manage your purchased event tickets on Ticketa. Check the status, details, and purchase dates of your tickets all in one place.",
};

// Define the default export of the TicketsPage function component.
// This component displays the user's tickets and provides functionality for viewing and managing them.
export default async function TicketsPage() {
  // Fetch the current user's tickets from the database.
  const { data } = await getCurrentUserTicket();

  console.log(data);

  // Render the TicketsPage component.
  return (
    <div className="maxCenter max-sm:px-5">
      {/* Header section with the events header and user profile */}
      <div className="flex items-center justify-between">
        {/* Render the EventsHeader component, likely displaying a navigation header for events */}
        <EventsHeader />

        {/* Render the UserProfile component, possibly showing user profile information or actions */}
        <div className="w-[fit-content]">
          <UserProfile />
        </div>
      </div>

      {/* Page heading for the tickets section */}
      <h2 className="font-medium text-xl">My Tickets</h2>

      {/* Render the TableInput component to display a table of the user's tickets */}
      {/* The table will have headers for Ticket ID, Event Name, Status, Purchase Date, and Price */}
      <TableInput
        header={["Ticket ID", "Event Name", "Status", "Purchase Date", "Price"]}
        tickets={data} // Pass the fetched tickets data as a prop to the TableInput component
      />
    </div>
  );
}
