// Indicate that this code is intended to run on the server side
"use server";

// Import necessary types and functions
import { AuthValidationType } from "@/typings/form"; // Type definition for authentication validation
import { ID } from "node-appwrite"; // Import ID utility from Appwrite for generating unique IDs
import { cookies } from "next/headers"; // Import cookies utility from Next.js for handling cookies
import { createAdminClient, createSessionClient } from "@/lib/appwrite.config"; // Import functions to create Appwrite clients
import { createUserInfo } from "./database.action"; // Import function to create user info in the database
import { redirect } from "next/navigation"; // Import redirect function from Next.js for navigation

// Function to get the current logged-in user
export async function getCurrentUser() {
  try {
    // Create a session-based client to interact with Appwrite
    const { account } = await createSessionClient();
    // Retrieve and return the current user's account details
    return await account.get();
  } catch (error: any) {
    // Return an error message if there is an issue retrieving the user
    return error.message;
  }
}

// Function to sign in a user with email and password
export async function signInUser(data: AuthValidationType) {
  try {
    // Create an admin-level client to interact with Appwrite
    const { account } = await createAdminClient();
    // Create a new session for the user using email and password
    const session = await account.createEmailPasswordSession(
      data.email!, // User's email
      data.password! // User's password
    );

    // Set a secure, HTTP-only cookie to store the session token
    cookies().set("userSession", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Return success status if the sign-in is successful
    return { success: true };
  } catch (error: any) {
    // Return failure status and error message if the sign-in fails
    return { success: false, msg: error.message };
  }
}

// Function to sign up a new user
export async function signupUser(data: AuthValidationType) {
  try {
    // Create an admin-level client to interact with Appwrite
    const { account } = await createAdminClient();
    // Create a new user account in Appwrite with the provided details
    const response = await account.create(
      ID.unique(), // Generate a unique user ID
      data.email!, // User's email
      data.password!, // User's password
      data.fullname // User's full name
    );

    // Sign in the newly created user
    await signInUser({ email: data.email, password: data.password });

    // Extract user details from the response
    const { $id: userId, email } = response;

    // Create a document in the database with additional user information
    await createUserInfo({
      userId, // User ID from Appwrite
      username: data.username!, // User's username
      email, // User's email
      name: data.fullname!, // User's full name
    });

    // Return success status if the signup is successful
    return { success: true };
  } catch (error: any) {
    // Return failure status and error message if the signup fails
    return { success: false, msg: error.message };
  }
}

// Function to sign out the current user
export async function signOutUser() {
  try {
    // Create a session-based client to interact with Appwrite
    const { account } = await createSessionClient();

    // Delete the 'userSession' cookie to remove the session token
    cookies().delete("userSession");
    // Delete the current user session in Appwrite
    await account.deleteSession("current");
  } catch (error: any) {
    // Return error message if there is an issue during sign out
    return error.message;
  }

  // Redirect the user to the homepage after a successful sign-out
  redirect("/");
}
