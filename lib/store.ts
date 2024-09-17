import { CategoryState, SearchQueryState, UserActionState } from "@/typings"; // Import type definitions for the state from a typings file
import { create } from "zustand"; // Import the Zustand create function for state management

// Zustand store for managing category selection state
export const CategoryQuery = create<CategoryState>((set) => ({
  selectedValue: "", // Initial state for selected category value
  setSelectedValue: (selectedValue) => set(() => ({ selectedValue })), // Function to update the selected category value
}));

// Zustand store for managing search query state
export const SearchQuery = create<SearchQueryState>((set) => ({
  query: "", // Initial state for the search query
  setQuery: (query) => set(() => ({ query })), // Function to update the search query
}));

// Zustand store for managing user action toggles
export const UserActionToggle = create<UserActionState>((set) => ({
  open: null, // Initial state for the user action toggle (null implies no action is open)
  setOpen: (open) => set(() => ({ open })), // Function to update the user action toggle state
}));
