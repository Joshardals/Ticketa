import { getCurrentUserInfo } from "@/lib/actions/database.action"; // Import function to fetch current user info
import { UserActions } from "../(main)/UserActions"; // Import UserActions component to display user-related actions

/**
 * UserProfile component fetches current user information and displays the user's initials.
 * If no user data is available, it returns null.
 * @returns {JSX.Element | null} The rendered UserActions component or null if no user data is found.
 */
export async function UserProfile() {
  // Fetch current user information from the database
  const { data } = await getCurrentUserInfo();

  // If no user data is found, return null
  if (!data) return null;

  // Extract the user's name from the fetched data
  const name = data.name;

  // Generate initials from the user's name
  const initials = name
    .split(" ") // Split the name into words
    .map((word: any) => word[0]) // Extract the first letter of each word
    .join(""); // Join the letters to form the initials

  // Return the UserActions component with the generated initials as a prop
  return <UserActions initials={initials} />;
}
