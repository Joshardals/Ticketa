"use client";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex-1 flex items-center justify-evenly max-sm:hidden text-softWhite">
      <nav className="max-md:hidden">
        <ul className="flex items-center space-x-8">
          {navLinks.map((item, index) => {
            const { label, href } = item;
            return (
              <li
                key={index}
                className={` hover:text-sunsetOrange transition-all duration-300 ease-linear ${
                  pathname === href && "text-sunsetOrange"
                }`}
              >
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* <SearchBar /> */}
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return <div className="bg-red-500 sm:hidden">Hello World!</div>;
}
