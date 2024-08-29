"use server";
import { TicketParams, UserInfoParams } from "@/typings/database";
import { databases } from "../appwrite.config";
import { getCurrentUser } from "./auth.action";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USERS_ID,
  APPWRITE_EVENTS_ID,
  APPWRITE_TICKETS_ID,
} = process.env;

interface ExportType {
  success: boolean;
  data?: any;
  msg?: any;
}

// Creating User Info Document in the DB
export async function createUserInfo(data: UserInfoParams) {
  try {
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

    return { success: true };
  } catch (error: any) {
    console.log(`Failed to create user document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Generate a ticket after a user successfully purchases an event ticket
export async function createTicketInfo(data: TicketParams) {
  const user = await getCurrentUser();
  const { $id: userId } = user;
  try {
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

    return { success: true, msg: "Ticket created Successfully!" };
  } catch (error: any) {
    console.log(`Failed to create Ticket document in the db: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// Trying to get the current logged in user info.
export async function getCurrentUserInfo(): Promise<ExportType> {
  try {
    const user = await getCurrentUser();
    const { $id: userId } = user;

    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_USERS_ID as string,
      [Query.equal("userId", userId)]
    );

    return { success: true, data: data.documents[0] };
  } catch (error: any) {
    console.error(
      `Failed to fetch User Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Trying to get the current logged in user ticket.
export async function getCurrentUserTicket(): Promise<ExportType> {
  try {
    const user = await getCurrentUser();
    const { $id: userId } = user;

    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_TICKETS_ID as string,
      [Query.equal("userId", userId)]
    );

    return { success: true, data: data.documents };
  } catch (error: any) {
    console.error(
      `Failed to fetch User Ticket Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Trying to get all Events
export async function getEvents() {
  try {
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      [Query.orderDesc("")]
    );

    return { success: true, data: data.documents };
  } catch (error: any) {
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Trying to get Events By Id.
export async function getEventsById(id: string): Promise<ExportType> {
  try {
    const data = await databases.listDocuments(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      [Query.equal("eventId", id)]
    );

    return { success: true, data: data.documents[0] };
  } catch (error: any) {
    console.error(
      `Failed to fetch Events Document from the DB: ${error.message}`
    );
    return { success: false, msg: error.message };
  }
}

// Trying to Update an event by its id.
export async function updateEventsById(id: string) {
  try {
    // Fetch the event document by ID
    const event = await getEventsById(id);

    // Fetch the Current Logged In User
    const user = await getCurrentUser();
    const { $id: userId } = user;

    // // If event doesn't exist, return an error
    if (!event) {
      throw new Error("Event not found");
    }

    // // Get the current attendanceCount array or initialize if not existing
    const attendanceCount = event.data.attendanceCount || [];

    // // Add the user ID to the attendanceCount array if not already added
    if (!attendanceCount.includes(userId)) {
      attendanceCount.push(userId);
    }

    // Update the event document with the new attendanceCount
    const updatedEvent = await databases.updateDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_EVENTS_ID as string,
      event.data.$id,
      {
        attendanceCount, // Set the updated array
      }
    );

    // Return success with the updated event document
    revalidatePath("/(main)/events/[id]", "page");
    return { success: true, data: updatedEvent };
  } catch (error: any) {
    console.error(`Failed to update Events Document: ${error.message}`);
    return { success: false, msg: error.message };
  }
}

// A server action to check whether a user has already purchased a ticket before, to avoid purchasing multiple tickets with the same account.
export async function checkIfHasTicket(id: string) {
  try {
    // Fetch the event document by ID
    const event = await getEventsById(id);

    // Fetch the Current Logged In User
    const user = await getCurrentUser();
    const { $id: userId } = user;

    // // Get the current attendanceCount array or initialize if not existing
    const attendanceCount = event.data.attendanceCount || [];

    // Checking if the attendance count includes the current user id.
    if (attendanceCount.includes(userId)) {
      return { success: true, msg: true };
    } else {
      return { success: true, msg: false };
    }
  } catch (error: any) {
    console.error(`Failed to check if user has tickets: ${error.message}`);
    return { success: false, msg: error.message };
  }
}
