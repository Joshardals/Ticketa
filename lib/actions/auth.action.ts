"use server"; // Indicates that this code is to be executed on the server side.

// Import necessary types and functions
import { AuthValidationType } from "@/typings/form"; // Type definition for user authentication data.
import { ID } from "node-appwrite"; // Import Appwrite's ID utility for generating unique IDs.
import { cookies } from "next/headers"; // Import cookies handling from Next.js.
import { createAdminClient, createSessionClient } from "@/lib/appwrite.config"; // Import functions to create Appwrite clients.
import { createUserInfo } from "./database.action"; // Import function to create user information in the database.
import { redirect } from "next/navigation"; // Import redirect function from Next.js.

// Server-side function to get the current logged-in user.
export async function getCurrentUser() {
  try {
    // Create a session client to interact with Appwrite's account service.
    const { account } = await createSessionClient();
    // Fetch and return the current logged-in user's information.
    return await account.get();
  } catch (error: any) {
    // Return error message if there's an issue getting the current user.
    return error.message;
  }
}

// Server-side function to sign in a user.
export async function signInUser(data: AuthValidationType) {
  try {
    // Create an admin client to interact with Appwrite's account service.
    const { account } = await createAdminClient();
    // Create a session with the provided email and password.
    const session = await account.createEmailPasswordSession(
      data.email!, // User's email.
      data.password! // User's password.
    );

    // Set the session token in a cookie to manage user authentication state.
    cookies().set("userSession", session.secret, {
      path: "/", // Cookie is valid for the entire website.
      httpOnly: true, // Cookie is not accessible via JavaScript.
      sameSite: "strict", // Cookie is sent only for same-site requests.
      secure: true, // Cookie is only sent over HTTPS.
    });

    // Return success response if the sign-in is successful.
    return { success: true };
  } catch (error: any) {
    // Return failure response with error message if there's an issue signing in.
    return { success: false, msg: error.message };
  }
}

// Server-side function to sign up a new user.
export async function signupUser(data: AuthValidationType) {
  try {
    // Create an admin client to interact with Appwrite's account service.
    const { account } = await createAdminClient();
    // Create a new user account with the provided details.
    const response = await account.create(
      ID.unique(), // Generate a unique user ID.
      data.email!, // User's email.
      data.password!, // User's password.
      data.fullname // User's full name.
    );

    // Sign in the newly created user.
    await signInUser({ email: data.email, password: data.password });

    // Extract user ID and email from the response.
    const { $id: userId, email } = response;

    // Create additional user information in the database.
    await createUserInfo({
      userId,
      username: data.username!, // User's username.
      email,
      name: data.fullname!, // User's full name.
    });

    // Return success response if the sign-up is successful.
    return { success: true };
  } catch (error: any) {
    // Return failure response with error message if there's an issue signing up.
    return { success: false, msg: error.message };
  }
}

// Server-side function to sign out a user.
export async function signOutUser() {
  try {
    // Create a session client to interact with Appwrite's account service.
    const { account } = await createSessionClient();

    // Delete the user session cookie.
    cookies().delete("userSession");
    // Delete the current user session from Appwrite.
    await account.deleteSession("current");
  } catch (error: any) {
    // Return error message if there's an issue signing out.
    return error.message;
  }

  // Redirect the user to the homepage after successful sign-out.
  redirect("/");
}
