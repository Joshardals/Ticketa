import { Category } from "@/components/shared/Category";
import { Events } from "@/components/(main)/Events";
import EventsHeader from "@/components/(main)/EventsHeader";
import { Metadata } from "next";
import { SearchBar } from "@/components/shared/SearchBar";
import { UserProfile } from "@/components/shared/UserProfile";
import { getEvents } from "@/lib/actions/database.action";

export const metadata: Metadata = {
  title: "Events | Ticketa",
  description:
    "Explore upcoming student events on Ticketa. From lively parties to exciting concerts, find all the events you're interested in and secure your tickets. Browse through our curated list of events and make your plans today.",
};

export default async function Eventspage() {
  const { data } = await getEvents();
  console.log(data);
  if (!data) return null;
  return (
    <div className="maxCenter">
      <div className="flex justify-between items-center max-sm:px-5">
        <EventsHeader />
        <div className="max-sm:hidden">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Category />
          </div>

          {/* User Profile Icon - This contains everything about user actions, My tickets and Logout for example.  */}
          <div>
            <UserProfile />
          </div>
        </div>
      </div>
      <div className="px-5 mb-5 sm:hidden">
        <SearchBar />
      </div>

      <Events />

      {data.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}
    </div>
  );
}
