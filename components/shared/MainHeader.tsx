import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";
import { UserProfile } from "./UserProfile";

export function MainHeader() {
  return (
    <header className="p-5 maxCenter fixed left-0 right-0 top-0 grid grid-cols-4 gap-4 items-center">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold">
        Ticketa<span className=" text-deepRed">.</span>
      </h1>

      {/* Navigation Links */}
      <NavLinks />

      {/* SearchBar - This component allows us to be able to search for events. */}
      <SearchBar />

      {/* User Profile Icon */}
      <UserProfile />
    </header>
  );
}
