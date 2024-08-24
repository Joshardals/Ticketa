import { Events } from "@/components/(main)/Events";
import EventsHeader from "@/components/(main)/EventsHeader";

export default function Eventpage() {
  return (
    <div className="maxCenter">
      <EventsHeader />
      <Events />
    </div>
  );
}
