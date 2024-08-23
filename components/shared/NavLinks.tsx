import { navLinks } from "@/lib/data";
import Link from "next/link";

export function NavLinks() {
  return (
    <nav>
      <ul className="flex items-center space-x-4">
        {navLinks.map((item, index) => {
          const { label, href } = item;
          return (
            <li key={index} className="hover:text-paleYellow">
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
