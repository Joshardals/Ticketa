"use client"; // Indicates that this file should be processed on the client side

import { CategoryQuery, SearchQuery } from "@/lib/store"; // Imports custom hooks for category and search queries
import { EventsCard } from "./EventsCard"; // Imports the EventsCard component to display each event
import EventsFallback from "@/components/ui/skeletons/EventsSkeleton"; // Imports a fallback component to show while loading
import { getEvents } from "@/lib/actions/database.action"; // Imports function to fetch events from the server
import { useEffect, useRef, useState } from "react"; // Imports React hooks for state management and side effects

export function Events() {
  // State to hold all events fetched from the server
  const [events, setEvents] = useState<any[]>();
  // Ref to track if the component is mounted for the first time
  const isInitialMount = useRef(true);
  // State to hold filtered events based on search and category
  const [filteredEvents, setFilteredEvents] = useState<any[]>();
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // Hook to get the search query from the URL or state
  const { query } = SearchQuery();
  // Hook to get the selected category from the URL or state
  const { selectedValue } = CategoryQuery();

  // useEffect to fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching

        // Fetch events data from the server
        const { data } = await getEvents();
        setEvents(data); // Set the fetched events in state
        setFilteredEvents(data); // Initialize filtered events with all events
      } catch (error: any) {
        console.log(`Error: ${error.message}`); // Log any errors during fetch
      } finally {
        setLoading(false); // Set loading state to false after fetch
      }
    };

    fetchEvents(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once after the initial render

  // useEffect to filter events based on search query and selected category
  useEffect(() => {
    if (!events || events.length === 0) return; // Do nothing if no events are present

    // Set loading to true while filtering
    setLoading(true);

    // Debounce to limit how frequently the filtering occurs
    const debounce = setTimeout(() => {
      let filtered = events; // Start with all events

      // Sort by Most Recent if selected
      if (selectedValue === "most-recent") {
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        );
      }

      // Sort by Most Popular if selected
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

      setFilteredEvents(filtered); // Update state with filtered events

      setLoading(false); // Set loading state to false after filtering is complete
    }, 1000); // Debounce delay of 1 second

    // Cleanup function to clear the debounce timeout
    return () => clearTimeout(debounce);
  }, [query, events, selectedValue]); // Runs when `query`, `events`, or `selectedValue` changes

  // Show fallback UI if loading
  if (loading) return <EventsFallback />;

  // Show a message if no events are found
  if (!filteredEvents) return <div className="px-5">No events found!</div>;

  return (
    <>
      {filteredEvents.length > 0 ? (
        <div className="px-5 grid lg:grid-cols-3 gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
          {/* Render EventsCard for each filtered event */}
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
