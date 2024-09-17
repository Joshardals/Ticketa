"use server"; // Indicates that this code is executed on the server side.

import { TicketParams, UserInfoParams } from "@/typings/database"; // Import type definitions for user and ticket data.
import { databases } from "../appwrite.config"; // Import Appwrite database configuration.
import { getCurrentUser } from "./auth.action"; // Import function to get the currently logged-in user.
import { ID, Query } from "node-appwrite"; // Import Appwrite's ID and Query utilities.
import { revalidatePath } from "next/cache"; // Import function to revalidate Next.js paths.

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_ID,
  APPWRITE_EVENTS_ID,
  APPWRITE_TICKETS_ID,
} = process.env; // Retrieve Appwrite database IDs from environment variables.

interface ExportType {
  success: boolean;
  data?: any;
  msg?: any;
}

// Create a user information document in the database.
export async function createUserInfo(data: UserInfoParams) {
  try {
    // Create a new document in the users collection with provided data.
    await databases.createDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_USERS_ID as string,
      ID.unique(),
      {
        userId: data.userId,
        email: data.email,
        name: data.name,
        username: data.username,
      }
    );

    return { success: true }; // Return success if document creation is successful.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.log(`Failed to create user document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Generate a ticket after a user successfully purchases an event ticket.
export async function createTicketInfo(data: TicketParams) {
  const user = await getCurrentUser(); // Get the current logged-in user.
  const { $id: userId } = user;
  try {
    // Create a new ticket document in the tickets collection with provided data.
    await databases.createDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_TICKETS_ID as string,
      ID.unique(),
      {
        ticketId: ID.unique(),
        eventName: data.eventName,
        eventId: data.eventId,
        userId,
        purchaseDate: new Date(),
        price: data.price,
      }
    );

    revalidatePath("/my-tickets"); // Revalidate the path to refresh ticket data.
    return { success: true, msg: "Ticket created Successfully!" }; // Return success message.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.log(`Failed to create Ticket document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Fetch the current logged-in user info.
export async function getCurrentUserInfo(): Promise<ExportType> {
  try {
    const user = await getCurrentUser(); // Get the current logged-in user.
    const { $id: userId } = user;

    // Retrieve user document from the database using userId.
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_USERS_ID as string,
      [Query.equal("userId", userId)]
    );

    return { success: true, data: data.documents[0] }; // Return user info if successful.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(
      `Failed to fetch User Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Fetch the current logged-in user's tickets.
export async function getCurrentUserTicket(): Promise<ExportType> {
  try {
    const user = await getCurrentUser(); // Get the current logged-in user.
    const { $id: userId } = user;

    // Retrieve ticket documents from the database using userId.
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_TICKETS_ID as string,
      [Query.equal("userId", userId)]
    );

    return { success: true, data: data.documents }; // Return tickets if successful.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(
      `Failed to fetch User Ticket Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Fetch all events.
export async function getEvents() {
  try {
    // Retrieve all event documents from the database.
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      [Query.orderDesc("")]
    );

    return { success: true, data: data.documents }; // Return events if successful.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Fetch event details by ID.
export async function getEventsById(id: string): Promise<ExportType> {
  try {
    // Retrieve event document from the database using eventId.
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      [Query.equal("eventId", id)]
    );

    return { success: true, data: data.documents[0] }; // Return event details if successful.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Update an event by its ID.
export async function updateEventsById(id: string) {
  try {
    // Fetch the event document by ID.
    const event = await getEventsById(id);

    // Fetch the current logged-in user.
    const user = await getCurrentUser();
    const { $id: userId } = user;

    // If event doesn't exist, throw an error.
    if (!event) {
      throw new Error("Event not found");
    }

    // Get the current attendanceCount array or initialize if not existing.
    const attendanceCount = event.data.attendanceCount || [];

    // Add the user ID to the attendanceCount array if not already included.
    if (!attendanceCount.includes(userId)) {
      attendanceCount.push(userId);
    }

    // Update the event document with the new attendanceCount.
    const updatedEvent = await databases.updateDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      event.data.$id,
      {
        attendanceCount, // Set the updated array.
      }
    );

    // Revalidate the event page to reflect updates.
    revalidatePath("/(main)/events/[id]", "page");
    return { success: true, data: updatedEvent }; // Return success with updated event data.
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(`Failed to update Events Document: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Check if a user has already purchased a ticket for an event.
export async function checkIfHasTicket(id: string) {
  try {
    // Fetch the event document by ID.
    const event = await getEventsById(id);

    // Fetch the current logged-in user.
    const user = await getCurrentUser();
    const { $id: userId } = user;

    // Get the current attendanceCount array.
    const attendanceCount = event.data.attendanceCount || [];

    // Check if the user ID is included in the attendanceCount array.
    if (attendanceCount.includes(userId)) {
      return { success: true, msg: true }; // Return true if the user has a ticket.
    } else {
      return { success: true, msg: false }; // Return false if the user does not have a ticket.
    }
  } catch (error: any) {
    // Log error and return failure response if there's an issue.
    console.error(`Failed to check if user has tickets: ${error.message}`);
    return { success: false, msg: error.message };
  }
}
