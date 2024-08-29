"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/auth.action";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

export function UserActions({ initials }: { initials: string }) {
  const [loading, setLoading] = useState<boolean | null>(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOutUser();
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full max-sm:w-full flex justify-end">
        <div
          className={`cursor-pointer transition-all duration-100 ease-linear bg-emeraldGreen border-0 hover:border-2 hover:border-sunsetOrange rounded-full size-10 text-softWhite flex items-center justify-center `}
        >
          {initials}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-sm:ml-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {navLinks.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className={`${
              item.label === "Home" || item.label === "Explore Events"
                ? "hidden"
                : ""
            } md:hidden`}
          >
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
