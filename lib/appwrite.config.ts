import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";

// Function to create a session client
export async function createSessionClient() {
  // Initialize the Appwrite client with endpoint and project ID from environment variables
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string);

  // Retrieve the session cookie from the request headers
  const session = cookies().get("userSession");

  // Check if the session cookie exists and is valid
  if (!session || !session.value) {
    throw new Error("Session not found or invalid"); // Changed to a more descriptive error message
  }

  // Set the session token for the client
  client.setSession(session.value);

  // Return an object with an `account` getter that provides an Account instance using the client
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Function to create an admin client
export async function createAdminClient() {
  // Initialize the Appwrite client with endpoint, project ID, and API key from environment variables
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string);

  // Return an object with an `account` getter that provides an Account instance using the client
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Destructure environment variables for client configuration
const { NEXT_PUBLIC_APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY } =
  process.env;

// Initialize the Appwrite client with endpoint, project ID, and API key for general use
const client = new Client()
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(APPWRITE_PROJECT_ID as string)
  .setKey(APPWRITE_API_KEY as string);

// Create an instance of Databases with the client
export const databases = new Databases(client);
