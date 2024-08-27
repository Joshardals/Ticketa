import { Category } from "@/components/shared/Category";
import { Events } from "@/components/(main)/Events";
import EventsHeader from "@/components/(main)/EventsHeader";
import { SearchBar } from "@/components/shared/SearchBar";
import { Suspense } from "react";

export default function Eventspage() {
  return (
    <div className="maxCenter">
      <div className="flex justify-between items-center px-5">
        <EventsHeader />
        <div className="max-sm:hidden">
          <SearchBar />
        </div>
        <Category />
      </div>
      <div className="px-5 mb-5 sm:hidden">
        <SearchBar />
      </div>

      <Events />
    </div>
  );
}
