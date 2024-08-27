"use client";
import { IoSearchSharp } from "react-icons/io5";
import { Input } from "../ui/input";
import { SearchQuery } from "@/lib/store";

export function SearchBar() {
  const { setQuery } = SearchQuery();
  return (
    <div className="relative cursor-pointer sm:w-[280px]">
      <Input
        type="text"
        placeholder="Search for Events"
        className="bg-paleYellow"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute top-0 right-0 h-full flex items-center px-1 rounded-md bg-paleYellow">
        <IoSearchSharp className="size-5 text-darkCharcoal" />
      </div>
    </div>
  );
}
