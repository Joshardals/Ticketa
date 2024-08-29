import EventsHeader from "@/components/(main)/EventsHeader";
import { TableInput } from "@/components/(main)/TableInput";
import { UserProfile } from "@/components/shared/UserProfile";
import { getCurrentUserTicket } from "@/lib/actions/database.action";

export default async function TicketsPage() {
  const { data } = await getCurrentUserTicket();
  console.log(data);
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
