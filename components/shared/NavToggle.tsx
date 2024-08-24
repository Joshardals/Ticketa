"use client";

import { MouseEvent } from "react";
import { UserActionToggle } from "@/lib/store";

export function NavToggle() {
  const { open, setOpen } = UserActionToggle();
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <button
      type="button"
      className="navToggle md:hidden"
      onClick={handleClick}
      aria-label="Toggle Navigation"
    >
      <span className={` bg-softWhite ${open && "active"}`}></span>
      <span className={` bg-softWhite ${open && "active"}`}></span>
      <span className={` bg-softWhite ${open && "active"}`}></span>
    </button>
  );
}
