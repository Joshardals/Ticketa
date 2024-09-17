// Import necessary components and utilities for the Eventspage component.
// - Category: Component for displaying event categories.
// - Events: Component for displaying a list of events.
// - EventsHeader: Header component for event-related navigation or information.
// - Metadata: Type from Next.js to define page metadata for SEO and other purposes.
// - SearchBar: Component for searching events.
// - UserProfile: Component for displaying user profile information and actions.
import { Category } from "@/components/shared/Category";
import { Events } from "@/components/(main)/Events";
import EventsHeader from "@/components/(main)/EventsHeader";
import { Metadata } from "next";
import { SearchBar } from "@/components/shared/SearchBar";
import { UserProfile } from "@/components/shared/UserProfile";

// Define the metadata for the events page.
// This metadata includes the title and description for SEO and page identification purposes.
export const metadata: Metadata = {
  title: "Events | Ticketa", // Title of the page, shown in the browser tab and search results.
  description:
    "Explore upcoming student events on Ticketa. From lively parties to exciting concerts, find all the events you're interested in and secure your tickets. Browse through our curated list of events and make your plans today.",
  // Description of the page, used by search engines and social media platforms to display a summary.
};

// Define the Eventspage function component as the default export of the file.
// This component displays the events page, including event categories, a search bar, and user profile options.
export default async function Eventspage() {
  return (
    <div className="maxCenter">
      {/* Container for the header, search bar, and user profile */}
      <div className="flex justify-between items-center max-sm:px-5">
        {/* Render the EventsHeader component */}
        <EventsHeader />

        {/* Render the SearchBar component, hidden on small screens */}
        <div className="max-sm:hidden">
          <SearchBar />
        </div>

        {/* Container for category and user profile components */}
        <div className="flex items-center space-x-4">
          {/* Render the Category component */}
          <div>
            <Category />
          </div>

          {/* User Profile Icon - Contains user actions such as viewing tickets and logging out */}
          <div>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Render the SearchBar component on small screens */}
      <div className="px-5 mb-5 sm:hidden">
        <SearchBar />
      </div>

      {/* Render the Events component to display the list of events */}
      <Events />
    </div>
  );
}
