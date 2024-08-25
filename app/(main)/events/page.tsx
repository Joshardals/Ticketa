import { Category } from "@/components/shared/Category";
import { Events } from "@/components/(main)/Events";
import EventsHeader from "@/components/(main)/EventsHeader";
import { SearchBar } from "@/components/shared/SearchBar";

export default function Eventspage() {
  return (
    <div className="maxCenter">
      <div className="flex justify-between items-center px-5">
        <EventsHeader />
        <SearchBar />
        <Category />
      </div>

      <Events />
    </div>
  );
}
