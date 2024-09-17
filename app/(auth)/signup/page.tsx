// Import the SignupForm component from the "form" directory within the "components" folder.
// The @ symbol is used as a shortcut to refer to the base directory of the project.
import { SignupForm } from "@/components/form/SignupForm";

// Import the Metadata type from the "next" library.
// This type is used to define metadata for the page, such as its title and description.
import { Metadata } from "next";

// Define the metadata for this page using the Metadata type.
// This metadata will be used to set the title and description of the page for SEO purposes and to enhance user experience.
export const metadata: Metadata = {
  title: "Sign Up | Ticketa",
  description:
    "Create your Ticketa account and start exploring student events—sign up now to browse, buy, and manage your tickets effortlessly.",
};

// Define and export the SignupPage function component.
// This component renders the sign-up page of the application, including the form for user registration.
export default function SignupPage() {
  // Return the TSX structure that defines the layout and content of the sign-up page.
  // This TSX will be rendered as HTML and displayed in the browser.
  return (
    <main className="px-5 maxCenter contentCenter w-full mt-[3.5rem]">
      {/* Container div for the page header and description */}
      <div className="mb-8 text-center">
        {/* Page heading for account creation */}
        <h2 className="text-xl max-md:text-lg font-bold">Create an Account</h2>
        {/* Description text encouraging users to join */}
        <p className="text-pretty">Join Ticketa and start exploring events!</p>
      </div>
      {/* Render the SignupForm component which includes the registration form for new users */}
      <SignupForm />
    </main>
  );
}
