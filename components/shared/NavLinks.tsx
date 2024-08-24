"use client";
import { navLinks } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="max-md:hidden">
      <ul className="flex items-center space-x-4">
        {navLinks.map((item, index) => {
          const { label, href } = item;
          return (
            <li
              key={index}
              className={`hover:text-sunsetOrange transition-all duration-300 ease-linear ${
                pathname === href && "text-sunsetOrange"
              }`}
            >
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
