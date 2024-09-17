// Import the LoginForm component from the "form" directory within the "components" folder.
// The @ symbol is a shortcut to the base directory of the project.
import { LoginForm } from "@/components/form/LoginForm";

// Import the getCurrentUser function from the "auth.action" file in the "lib/actions" directory.
// This function is used to retrieve the currently logged-in user.
import { getCurrentUser } from "@/lib/actions/auth.action";

// Import the Metadata type from the "next" library, which allows defining metadata for the page.
import { Metadata } from "next";

// Import the redirect function from the "next/navigation" module.
// This function is used to redirect the user to a different page programmatically.
import { redirect } from "next/navigation";

// Define the metadata for the page using the Metadata type.
// This metadata will be used to set the title and description of the page for SEO and better user experience.
export const metadata: Metadata = {
  title: "Login | Ticketa",
  description:
    "Log in to your Ticketa account and access student events—browse, buy, and manage your tickets effortlessly.",
};

// Define and export an asynchronous function component called LoginPage.
// This function represents the login page of the application and handles user authentication and page rendering.
export default async function LoginPage() {
  // Call the getCurrentUser function to check if there is a currently logged-in user.
  const user = await getCurrentUser();

  // If a user is already logged in, redirect them to the "/home" page.
  if (user) redirect("/home");

  // Return the TSX structure to be rendered for this page.
  // This TSX will be transformed into HTML and displayed in the browser.
  return (
    <main className="px-5 maxCenter contentCenter w-full">
      {/* Container div for the welcome message */}
      <div className="mb-8 text-center">
        {/* Heading for the page */}
        <h2 className="text-xl max-md:text-lg font-bold">Welcome to Ticketa</h2>
        {/* Description text for the page */}
        <p className="text-pretty">
          Your gateway to student events—log in to browse and manage your
          tickets.
        </p>
      </div>
      {/* Render the LoginForm component which contains the form for user login */}
      <LoginForm />
    </main>
  );
}
