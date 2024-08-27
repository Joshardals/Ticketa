"use client";
import { CategoryQuery, SearchQuery } from "@/lib/store";
import { EventsCard } from "./EventsCard";
import EventsFallback from "@/components/ui/skeletons/EventsSkeleton";
import { getEvents } from "@/lib/actions/database.action";
import { useEffect, useState } from "react";

export function Events() {
  const [events, setEvents] = useState<any[]>();
  const [filteredEvents, setFilteredEvents] = useState<any[]>();
  const [loading, setLoading] = useState(true); // Loading state
  const { query } = SearchQuery();
  const { selectedValue } = CategoryQuery();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data } = await getEvents();
        setEvents(data);
        setFilteredEvents(data);
        console.log(data);
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) return;

    setLoading(true); // Set loading to true when search begins

    const debounce = setTimeout(() => {
      let filtered = events;

      // Sorting by Most Recent if Selected
      if (selectedValue === "most-recent") {
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
      }

      // Sorting by Most Popular if Selected
      if (selectedValue === "most-popular") {
      }

      // Filter by Search Query
      if (query) {
        filtered = filtered?.filter((event) =>
          event.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Filter by Selected Category
      if (selectedValue && selectedValue !== "most-recent") {
        filtered = filtered?.filter(
          (event) =>
            event.category.toLowerCase() === selectedValue.toLowerCase()
        );
      }

      setFilteredEvents(filtered);

      setLoading(false); // Set loading to false when filtering is complete
    }, 1000);

    return () => clearTimeout(debounce);
  }, [query, events, selectedValue]);

  if (loading) return <EventsFallback />; // Show fallback Ui Skeleton while loading

  if (!filteredEvents) return <div>No events found!</div>;
  return (
    <>
      {filteredEvents.length > 0 ? (
        <div className="px-5 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
          {filteredEvents?.map((event, index) => (
            <div key={index}>
              <EventsCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p className="font-bold text-center text-lg mt-4">
          No events found{" "}
          {query && (
            <>
              for "<span className="text-deepRed">{query}</span>"
            </>
          )}
          {selectedValue && (
            <>
              {" "}
              in the "<span className="text-emeraldGreen">{selectedValue}</span>
              " category
            </>
          )}
        </p>
      )}
    </>
  );
}
