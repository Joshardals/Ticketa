"use client";
import { IoSearchSharp } from "react-icons/io5";
import { Input } from "../ui/input";

export function SearchBar() {
  return (
    <div className="relative cursor-pointer">
      <Input
        type="text"
        placeholder="Search for Events"
        className="bg-paleYellow"
      />
      <div className="absolute top-0 right-0 h-full flex items-center px-1 bg-paleYellow">
        <IoSearchSharp className="size-5 text-darkCharcoal" />
      </div>
    </div>
  );
}
