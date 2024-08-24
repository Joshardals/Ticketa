import { UserActionState } from "@/typings";
import { create } from "zustand";

export const UserActionToggle = create<UserActionState>((set) => ({
  open: null,
  setOpen: (open) => set(() => ({ open })),
}));
