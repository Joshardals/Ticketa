// Typings for the sidebar for mobile devices in Dashboard
export interface UserActionState {
  open: boolean | null;
  setOpen: (mobile: UserActionState["open"]) => void;
}
