import { navLinks } from "@/lib/data";

export function NavLinks() {
  return (
    <nav>
      <ul>
        {navLinks.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
      </ul>
    </nav>
  );
}
