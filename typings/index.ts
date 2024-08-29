// Typings for the Category
export interface CategoryState {
  selectedValue: string;
  setSelectedValue: (selectedValue: CategoryState["selectedValue"]) => void;
}
// Typings to check if a user has liked an event.
export interface HasLikedState {
  liked: boolean | null;
  setLiked: (mobile: HasLikedState["liked"]) => void;
}

// Typings for the Search Query
export interface SearchQueryState {
  query: string;
  setQuery: (query: SearchQueryState["query"]) => void;
}

// Typings for the sidebar for mobile devices in Dashboard
export interface UserActionState {
  open: boolean | null;
  setOpen: (mobile: UserActionState["open"]) => void;
}

export interface UserEventModel {
  eventId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  price: number;
  attendanceCount: number;
  imgUrl: string;

  // User Info Typings
  name: string;
  email: string;
}
