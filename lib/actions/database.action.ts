// Indicate that this code is intended to run on the server side
"use server";

// Import necessary types and functions
import { TicketParams, UserInfoParams } from "@/typings/database"; // Type definitions for ticket and user info parameters
import { databases } from "../appwrite.config"; // Import the Appwrite databases client configuration
import { getCurrentUser } from "./auth.action"; // Import function to get the current logged-in user
import { ID, Query } from "node-appwrite"; // Import ID utility and Query functions from Appwrite for document handling
import { revalidatePath } from "next/cache"; // Import revalidatePath to invalidate cached paths

// Retrieve environment variables for Appwrite configuration
const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_ID,
  APPWRITE_EVENTS_ID,
  APPWRITE_TICKETS_ID,
} = process.env;

// Define the structure of responses from database operations
interface ExportType {
  success: boolean;
  data?: any; // Data from the database query
  msg?: any; // Error message or success message
}

// Function to create a user info document in the database
export async function createUserInfo(data: UserInfoParams) {
  try {
    // Create a new document in the Users collection with the given user information
    await databases.createDocument(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_USERS_ID as string, // Users collection ID
      ID.unique(), // Generate a unique document ID
      {
        userId: data.userId, // User ID
        email: data.email, // User email
        name: data.name, // User full name
        username: data.username, // User username
      }
    );

    // Return success status if the document creation is successful
    return { success: true };
  } catch (error: any) {
    // Log and return error message if document creation fails
    console.log(`Failed to create user document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Function to create a ticket document after a user purchases an event ticket
export async function createTicketInfo(data: TicketParams) {
  try {
    // Retrieve the current logged-in user
    const user = await getCurrentUser();
    const { $id: userId } = user; // Extract user ID from the user object

    // Create a new document in the Tickets collection with ticket information
    await databases.createDocument(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_TICKETS_ID as string, // Tickets collection ID
      ID.unique(), // Generate a unique document ID
      {
        ticketId: ID.unique(), // Generate a unique ticket ID
        eventName: data.eventName, // Event name
        eventId: data.eventId, // Event ID
        userId, // User ID
        purchaseDate: new Date(), // Current date and time
        price: data.price, // Ticket price
      }
    );

    // Revalidate the path to refresh the ticket list on the client-side
    revalidatePath("/my-tickets");

    // Return success status with a message
    return { success: true, msg: "Ticket created Successfully!" };
  } catch (error: any) {
    // Log and return error message if ticket creation fails
    console.log(`Failed to create Ticket document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Function to get the current logged-in user info
export async function getCurrentUserInfo(): Promise<ExportType> {
  try {
    // Retrieve the current logged-in user
    const user = await getCurrentUser();
    const { $id: userId } = user; // Extract user ID from the user object

    // Query the Users collection to find the document matching the current user's ID
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_USERS_ID as string, // Users collection ID
      [Query.equal("userId", userId)] // Query filter to match user ID
    );

    // Return success status with the user info document
    return { success: true, data: data.documents[0] };
  } catch (error: any) {
    // Log and return error message if fetching user info fails
    console.error(
      `Failed to fetch User Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Function to get all tickets of the current logged-in user
export async function getCurrentUserTicket(): Promise<ExportType> {
  try {
    // Retrieve the current logged-in user
    const user = await getCurrentUser();
    const { $id: userId } = user; // Extract user ID from the user object

    // Query the Tickets collection to find all tickets matching the current user's ID
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_TICKETS_ID as string, // Tickets collection ID
      [Query.equal("userId", userId)] // Query filter to match user ID
    );

    // Return success status with the list of user tickets
    return { success: true, data: data.documents };
  } catch (error: any) {
    // Log and return error message if fetching tickets fails
    console.error(
      `Failed to fetch User Ticket Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Function to get all events from the database
export async function getEvents() {
  try {
    // Query the Events collection to retrieve all event documents
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_EVENTS_ID as string, // Events collection ID
      [Query.orderDesc("")] // Order documents in descending order (default ordering)
    );

    // Return success status with the list of events
    return { success: true, data: data.documents };
  } catch (error: any) {
    // Log and return error message if fetching events fails
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Function to get event details by event ID
export async function getEventsById(id: string): Promise<ExportType> {
  try {
    // Query the Events collection to find the document matching the provided event ID
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_EVENTS_ID as string, // Events collection ID
      [Query.equal("eventId", id)] // Query filter to match event ID
    );

    // Return success status with the event document
    return { success: true, data: data.documents[0] };
  } catch (error: any) {
    // Log and return error message if fetching event fails
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Function to update an event by its ID
export async function updateEventsById(id: string) {
  try {
    // Retrieve the event document by its ID
    const event = await getEventsById(id);

    // Retrieve the current logged-in user
    const user = await getCurrentUser();
    const { $id: userId } = user; // Extract user ID from the user object

    // Check if the event document exists
    if (!event) {
      throw new Error("Event not found"); // Throw an error if the event is not found
    }

    // Get the current attendance count array or initialize if it does not exist
    const attendanceCount = event.data.attendanceCount || [];

    // Add the user ID to the attendance count array if it is not already included
    if (!attendanceCount.includes(userId)) {
      attendanceCount.push(userId);
    }

    // Update the event document with the new attendance count
    const updatedEvent = await databases.updateDocument(
      APPWRITE_DATABASE_ID as string, // Database ID
      APPWRITE_EVENTS_ID as string, // Events collection ID
      event.data.$id, // Document ID
      {
        attendanceCount, // Updated attendance count array
      }
    );

    // Revalidate the path to refresh the event details on the client-side
    revalidatePath("/(main)/events/[id]", "page");

    // Return success status with the updated event document
    return { success: true, data: updatedEvent };
  } catch (error: any) {
    // Log and return error message if updating the event fails
    console.error(`Failed to update Events Document: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Function to check if the current user has already purchased a ticket for a specific event
export async function checkIfHasTicket(id: string) {
  try {
    // Retrieve the event document by its ID
    const event = await getEventsById(id);

    // Retrieve the current logged-in user
    const user = await getCurrentUser();
    const { $id: userId } = user; // Extract user ID from the user object

    // Get the current attendance count array or initialize if it does not exist
    const attendanceCount = event.data.attendanceCount || [];

    // Check if the user ID is included in the attendance count array
    if (attendanceCount.includes(userId)) {
      // Return success status with a message indicating that the user has a ticket
      return { success: true, msg: true };
    } else {
      // Return success status with a message indicating that the user does not have a ticket
      return { success: true, msg: false };
    }
  } catch (error: any) {
    // Log and return error message if checking tickets fails
    console.error(`Failed to check if user has tickets: ${error.message}`);
    return { success: false, msg: error.message };
  }
}
