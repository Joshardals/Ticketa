import EventsHeader from "@/components/(main)/EventsHeader";
import { TableInput } from "@/components/(main)/TableInput";
import { UserProfile } from "@/components/shared/UserProfile";
import { getCurrentUserTicket } from "@/lib/actions/database.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tickets | Ticketa",
  description:
    "View and manage your purchased event tickets on Ticketa. Check the status, details, and purchase dates of your tickets all in one place.",
};

export default async function TicketsPage() {
  const { data } = await getCurrentUserTicket();

  return (
    <div className="maxCenter max-sm:px-5">
      <div className="flex items-center justify-between">
        <EventsHeader />
        <div className="w-[fit-content]">
          <UserProfile />
        </div>
      </div>

      <h2 className="font-medium text-xl">My Tickets</h2>

      <TableInput
        header={["Ticket ID", "Event Name", "Status", "Purchase Date", "Price"]}
        tickets={data}
      />
    </div>
  );
}
