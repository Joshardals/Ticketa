import { NavLinks } from "./NavLinks";
import { UserProfile } from "./UserProfile";

export function MainHeader() {
  return (
    <header className="absolute right-0 left-0 p-5 maxCenter flex gap-2 max-sm:gap-4 justify-between items-center select-none z-10">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold max-w-[fit-content] text-softWhite">
        Ticketa<span className=" text-deepRed">.</span>
      </h1>

      {/* Navigation Links - This one allows us to be able to navigate through the pages. */}
      <NavLinks />

      {/* User Profile Icon - This contains everything about user actions, Logout for example.  */}
      <UserProfile />
    </header>
  );
}
