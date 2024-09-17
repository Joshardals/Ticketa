"use client"; // Ensures this component is run on the client side.

import { BiCategoryAlt } from "react-icons/bi"; // Import icon for mobile view.
import { CategoryQuery } from "@/lib/store"; // Import store hook for managing selected category.
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import custom select components.
import { useEffect, useState } from "react"; // Import hooks for state and effect management.

export function Category() {
  const [isMobile, setIsMobile] = useState(false); // State to determine if the view is mobile.
  const { setSelectedValue } = CategoryQuery(); // Hook to manage the selected category value.

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's `sm` breakpoint is 640px
    };

    // Check on initial load
    handleResize();

    // Add event listener to check on resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleValueChange = (value: string) => {
    setSelectedValue(value); // Update the selected category value.
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[fit-content]">
        <SelectValue
          placeholder={
            isMobile ? (
              <span className="flex items-center">
                <BiCategoryAlt /> {/* Icon for mobile view */}
              </span>
            ) : (
              "Select a Category" // Placeholder text for desktop view
            )
          }
        />
      </SelectTrigger>
      <SelectContent>
        {/* Grouped items for different categories */}
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="most-popular">Most Popular</SelectItem>
          <SelectItem value="most-recent">Most Recent</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Music</SelectLabel>
          <SelectItem value="concerts">Concerts</SelectItem>
          <SelectItem value="festivals">Festivals</SelectItem>
          <SelectItem value="live-music">Live Music</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Sports</SelectLabel>
          <SelectItem value="football">Football</SelectItem>
          <SelectItem value="basketball">Basketball</SelectItem>
          <SelectItem value="marathons">Marathons</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Education</SelectLabel>
          <SelectItem value="conferences">Conferences</SelectItem>
          <SelectItem value="seminars">Seminars</SelectItem>
          <SelectItem value="workshops">Workshops</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Parties</SelectLabel>
          <SelectItem value="club-parties">Club Parties</SelectItem>
          <SelectItem value="private-parties">Private Parties</SelectItem>
          <SelectItem value="theme-parties">Theme Parties</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Technology</SelectLabel>
          <SelectItem value="hackathons">Hackathons</SelectItem>
          <SelectItem value="tech-meetups">Tech Meetups</SelectItem>
          <SelectItem value="product-launches">Product Launches</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Theater & Arts</SelectLabel>
          <SelectItem value="drama">Drama</SelectItem>
          <SelectItem value="art-exhibitions">Art Exhibitions</SelectItem>
          <SelectItem value="film-screenings">Film Screenings</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Networking</SelectLabel>
          <SelectItem value="professional-networking">
            Professional Networking
          </SelectItem>
          <SelectItem value="social-networking">Social Networking</SelectItem>
          <SelectItem value="business-networking">
            Business Networking
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Film & Media</SelectLabel>
          <SelectItem value="film-festivals">Film Festivals</SelectItem>
          <SelectItem value="media-conferences">Media Conferences</SelectItem>
          <SelectItem value="screenings">Screenings</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Food & Drink</SelectLabel>
          <SelectItem value="food-festivals">Food Festivals</SelectItem>
          <SelectItem value="wine-tastings">Wine Tastings</SelectItem>
          <SelectItem value="cooking-classes">Cooking Classes</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Health & Wellness</SelectLabel>
          <SelectItem value="yoga">Yoga</SelectItem>
          <SelectItem value="meditation">Meditation</SelectItem>
          <SelectItem value="fitness-classes">Fitness Classes</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Charity</SelectLabel>
          <SelectItem value="fundraisers">Fundraisers</SelectItem>
          <SelectItem value="volunteering">Volunteering</SelectItem>
          <SelectItem value="charity-runs">Charity Runs</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Gaming</SelectLabel>
          <SelectItem value="esports">Esports</SelectItem>
          <SelectItem value="gaming-conventions">Gaming Conventions</SelectItem>
          <SelectItem value="lan-parties">LAN Parties</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
