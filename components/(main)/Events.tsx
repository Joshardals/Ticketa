"use client";
import { CategoryQuery, SearchQuery } from "@/lib/store";
import { EventsCard } from "./EventsCard";
import EventsFallback from "@/components/ui/skeletons/EventsSkeleton";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getEvents, updateLikeCount } from "@/lib/actions/database.action";
import { useCallback, useEffect, useRef, useState } from "react";

export function Events() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [events, setEvents] = useState<any[]>();
  const [filteredEvents, setFilteredEvents] = useState<any[]>();
  const isMounted = useRef<boolean | null>(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { query } = SearchQuery();
  const [searchTriggered, setSearchTriggered] = useState(true); // New state to track search vs like
  const { selectedValue } = CategoryQuery();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    } // This is just a simple trick, that allows the useEffect to skip the First Render.
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

    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchEvents();
    fetchUser();
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) return;

    // Set loading to true only if search was triggered, not like button
    if (searchTriggered) {
      setLoading(true);
    }

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

  const handleLike = useCallback(
    async (eventId: string) => {
      setSearchTriggered(false);

      // Get the current user
      const user = await getCurrentUser();
      const { $id: userId } = user;

      const event = events?.find((event) => event.$id === eventId);
      if (event?.likedEvents?.includes(userId)) {
        alert("You have already liked this event");
        return; // Exit if the user has already liked the event
      }

      // Update the local state immediately for a responsive UI
      setEvents((prevEvents) =>
        prevEvents!.map((event) =>
          event.$id === eventId
            ? { ...event, likedEvents: [...event.likedEvents, userId] }
            : event
        )
      );

      try {
        const response = await updateLikeCount(eventId);
        if (!response?.success) {
          // Revert the like if the update fails
          setEvents((prevEvents) =>
            prevEvents!.map((event) =>
              event.$id === eventId
                ? {
                    ...event,
                    likedEvents: event.likedEvents.filter(
                      (id: any) => id !== userId
                    ),
                  }
                : event
            )
          );
        }
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
        // Revert the like if there's an error
        setEvents((prevEvents) =>
          prevEvents!.map((event) =>
            event.$id === eventId
              ? {
                  ...event,
                  likedEvents: event.likedEvents.filter(
                    (id: any) => id !== userId
                  ),
                }
              : event
          )
        );
      } finally {
        setSearchTriggered(true);
      }
    },
    [currentUser, events]
  );

  if (loading) return <EventsFallback />; // Show fallback Ui Skeleton while loading

  if (!filteredEvents) return <div className="px-5">No events found!</div>;
  return (
    <>
      {filteredEvents.length > 0 ? (
        <div className="px-5 grid lg:grid-cols-3 gap-2 md:gap-4 lg:gap-8 md:grid-cols-2 grid-cols-1">
          {filteredEvents?.map((event, index) => (
            <div key={index}>
              <EventsCard
                event={event}
                onLike={handleLike}
                hasLiked={event.likedEvents.includes(currentUser?.$id)}
              />
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
