"use client"; // Ensures this file runs on the client side.

import { AuthValidationType } from "@/typings/form"; // TypeScript type for form validation.
import { ButtonInput, FormInput } from "@/components/form/FormInput"; // Import custom form components.
import { Form } from "@/components/ui/form"; // Import Form component for form management.
import Link from "next/link"; // Import Link for client-side navigation.
import { SignUpValidation } from "@/lib/validations/form"; // Import Zod validation schema for sign-up.
import { useForm } from "react-hook-form"; // Import useForm hook for managing form state.
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation.
import { useState } from "react"; // Import useState for managing component state.
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver to integrate Zod with react-hook-form.
import { signupUser } from "@/lib/actions/auth.action"; // Import function for signing up users.

export function SignupForm() {
  const [error, setError] = useState<string | null>(null); // State for error messages.
  const [loading, setLoading] = useState<boolean>(false); // State for loading spinner.
  const router = useRouter(); // Router instance for navigation.

  // Initialize useForm with Zod resolver for validation and default values.
  const form = useForm<AuthValidationType>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Function to handle form submission.
  const onSubmit = async (values: AuthValidationType) => {
    try {
      setLoading(true); // Start loading state.
      setError(null); // Clear previous errors.

      // Attempt to sign up the user.
      const result = await signupUser({
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      });

      // Check if the sign-up was successful.
      if (!result.success) {
        setError(result.msg); // Set error message if sign-up fails.
        return;
      }

      alert("User created successfully"); // Show success message.
      router.push("/home"); // Redirect to home page on successful sign-up.
    } catch (error: any) {
      console.log(`Error signing up: ${error.message}`); // Log any unexpected errors.
      setError("An unexpected error occurred. Please try again."); // Display a generic error message.
    } finally {
      setLoading(false); // End loading state.
    }
  };

  return (
    <Form {...form}>
      {" "}
      {/* Spread form methods and state into the Form component. */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handle form submission.
        className="space-y-6 max-sm:w-full sm:w-96" // Responsive styling.
        autoComplete="off" // Disable browser autocomplete.
      >
        {/* Input fields for sign-up. */}
        <FormInput
          form={form}
          name="fullname"
          type="text"
          placeholder="Fullname"
          loading={loading}
        />
        <FormInput
          form={form}
          name="username"
          type="text"
          placeholder="Username"
          loading={loading}
        />
        <FormInput
          form={form}
          name="email"
          type="text"
          placeholder="Email"
          loading={loading}
        />
        <FormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />
        <FormInput
          form={form}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          loading={loading}
        />

        {/* Display error message if any. */}
        {error && <p className="text-deepRed text-xs font-bold">{error}</p>}

        {/* Submit button for the form. */}
        <ButtonInput loading={loading} label="Sign Up" />

        {/* Link to login page for users who already have an account. */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/" className="text-deepRed font-semibold">
            Log in here
          </Link>
        </p>
      </form>
    </Form>
  );
}
