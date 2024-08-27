"use server";
import { UserInfoParams } from "@/typings/database";
import { databases } from "../appwrite.config";
import { getCurrentUser } from "./auth.action";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

const { APPWRITE_DATABASE_ID, APPWRITE_USERS_ID, APPWRITE_EVENTS_ID } =
  process.env;

// Creating User Info Document in the DB
export async function createUserInfo(data: UserInfoParams) {
  try {
    await databases.createDocument(
      APPWRITE_DATABASE_ID as string,
      APPWRITE_USERS_ID as string,
      ID.unique(),
      {
        userId: data.userId,
        gender: data.gender,
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

// Trying to get the current logged in user info.
export async function getCurrentUserInfo() {
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
export async function getEventsById(id: string) {
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
