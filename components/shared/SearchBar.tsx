"use client";
import { IoSearchSharp } from "react-icons/io5";
import { Input } from "../ui/input";

export function SearchBar() {
  return (
    <div className="relative cursor-pointer">
      <Input
        type="text"
        placeholder="Search Events"
        className="bg-lightGray cursor-pointer"
        disabled
      />
      <div className="absolute top-0 right-0 h-full flex items-center px-1">
        <IoSearchSharp className="size-5 text-darkCharcoal" />
      </div>
    </div>
  );
}
