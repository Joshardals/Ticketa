// Import necessary components and utilities for the Homepage component.
// - Button: UI component for clickable buttons.
// - Link: Component from Next.js for client-side navigation between pages.
// - MainHeader: Component for the main header section of the page.
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainHeader } from "@/components/shared/MainHeader";

// Define the Homepage function component as the default export of the file.
// This component renders the main page content for the homepage.
export default function Homepage() {
  return (
    <main className="text-softWhite overflow-hidden">
      {/* Section with a full-screen background image */}
      <section className="h-screen bg-[url('/assets/party.jpg')] bg-cover bg-center relative">
        {/* Overlay with dark background and reduced opacity for better text visibility */}
        <div className="absolute bg-darkCharcoal inset-0 opacity-60" />

        {/* Render the MainHeader component at the top of the section */}
        <MainHeader />

        {/* Container for the main content, centered within the section */}
        <div className="absolute left-0 right-0 px-5 maxCenter flex flex-col justify-center items-center h-full text-center">
          {/* Main heading with capitalized text, large font size, and bold styling */}
          <h1 className="capitalize text-4xl max-sm:text-3xl font-bold">
            Join the festival fun
          </h1>

          {/* Description text with a pretty color and margin-bottom */}
          <p className="text-pretty mb-4">
            Experience the thrill and excitement of our upcoming events.
          </p>

          {/* Button that links to the events page */}
          <Link href="/events">
            {/* Render the Button component with the "home" variant */}
            <Button variant={"home"}>Explore Events</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
