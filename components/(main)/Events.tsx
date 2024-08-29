"use client";
import { CategoryQuery, SearchQuery } from "@/lib/store";
import { EventsCard } from "./EventsCard";
import EventsFallback from "@/components/ui/skeletons/EventsSkeleton";
import { getEvents } from "@/lib/actions/database.action";
import { useEffect, useRef, useState } from "react";

export function Events() {
  const [events, setEvents] = useState<any[]>();
  const isInitialMount = useRef(true);
  const [filteredEvents, setFilteredEvents] = useState<any[]>();
  const [loading, setLoading] = useState(true); // Loading state
  const { query } = SearchQuery();
  const { selectedValue } = CategoryQuery();

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     // Skip the first render
  //     isInitialMount.current = false;
  //     return;
  //   }

  //   const fetchEvents = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await getEvents();
  //       setEvents(data);
  //       setFilteredEvents(data);
  //     } catch (error: any) {
  //       console.log(`Error: ${error.message}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  useEffect(() => {
    console.log("useEffect triggered"); // Log when useEffect is triggered

    if (isInitialMount.current) {
      console.log("Initial mount detected, skipping fetch."); // Log if it's the first render
      isInitialMount.current = false;
      return;
    }

    const fetchEvents = async () => {
      console.log("Starting fetchEvents..."); // Log when fetch starts

      try {
        setLoading(true);
        console.log("Loading state set to true"); // Log loading state change

        const { data } = await getEvents();
        console.log("Events fetched successfully:", data); // Log fetched data

        setEvents(data);
        setFilteredEvents(data);
        console.log("Events and filteredEvents state updated"); // Log state updates
      } catch (error: any) {
        console.log(`Error during fetch: ${error.message}`); // Log any errors
      } finally {
        setLoading(false);
        console.log("Loading state set to false"); // Log final loading state change
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) return;

    // Set loading to true only if search was triggered, not like button
    setLoading(true);

    const debounce = setTimeout(() => {
      let filtered = events;

      // Sorting by Most Recent if Selected
      if (selectedValue === "most-recent") {
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
      }

      // // Sorting by Most Popular if Selected, so the event that has the most attendance will come first
      if (selectedValue === "most-popular") {
        filtered = [...filtered].sort(
          (a, b) => b.attendanceCount.length - a.attendanceCount.length
        );
      }

      // Filter by Search Query
      if (query) {
        filtered = filtered?.filter((event) =>
          event.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Filter by Selected Category
      if (
        selectedValue &&
        selectedValue !== "most-recent" &&
        selectedValue !== "most-popular"
      ) {
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

  if (!filteredEvents) return <div className="px-5">No events found!</div>;
  return (
    <>
      {filteredEvents.length > 0 ? (
        <div className="px-5 grid lg:grid-cols-3 gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
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
              for &quot;<span className="text-deepRed">{query}</span>&quot;
            </>
          )}
          {selectedValue && (
            <>
              {" "}
              in the &quot;
              <span className="text-emeraldGreen">{selectedValue}</span>
              &quot; category
            </>
          )}
        </p>
      )}
    </>
  );
}
