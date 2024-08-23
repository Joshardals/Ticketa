"use client";
import { createAvatar } from "@dicebear/core";
import { lorelei } from '@dicebear/collection';
import { useEffect } from "react";

const generateAvatar = (seed: string, gender: string) => {
  return createAvatar(lorelei, {
    seed: `${seed}-${gender}`,
    // Customize options as needed
  });
};

export function UserProfile() {
  return <div className="justify-self-end"></div>;
}
