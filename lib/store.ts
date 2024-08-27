import {
  CategoryState,
  HasLikedState,
  SearchQueryState,
  UserActionState,
} from "@/typings";
import { create } from "zustand";

export const CategoryQuery = create<CategoryState>((set) => ({
  selectedValue: "",
  setSelectedValue: (selectedValue) => set(() => ({ selectedValue })),
}));

export const SearchQuery = create<SearchQueryState>((set) => ({
  query: "",
  setQuery: (query) => set(() => ({ query })),
}));

export const UserActionToggle = create<UserActionState>((set) => ({
  open: null,
  setOpen: (open) => set(() => ({ open })),
}));

export const HasLiked = create<HasLikedState>((set) => ({
  liked: null,
  setLiked: (liked) => set(() => ({ liked })),
}));
