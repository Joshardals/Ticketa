// Import required classes from the Appwrite SDK
import { Client, Account, Databases } from "node-appwrite"; 
// Import the cookies utility from the Next.js headers module for accessing cookies
import { cookies } from "next/headers";

// Function to create a session-based Appwrite client for authenticated users
export async function createSessionClient() {
  // Create a new instance of the Appwrite Client
  const client = new Client()
    // Set the endpoint URL for the Appwrite server, using an environment variable
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    // Set the project ID for the Appwrite project, using an environment variable
    .setProject(process.env.APPWRITE_PROJECT_ID as string);

  // Retrieve the 'userSession' cookie from the incoming request
  const session = cookies().get("userSession");

  // Check if the session cookie is not present or its value is empty
  if (!session || !session.value) {
    // Throw an error if the session is not valid
    throw new Error(undefined);
  }

  // Set the session token in the Appwrite client
  client.setSession(session.value);

  // Return an object with a getter for the Appwrite Account service
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Function to create an admin Appwrite client with API key authentication
export async function createAdminClient() {
  // Create a new instance of the Appwrite Client
  const client = new Client()
    // Set the endpoint URL for the Appwrite server, using an environment variable
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    // Set the project ID for the Appwrite project, using an environment variable
    .setProject(process.env.APPWRITE_PROJECT_ID as string)
    // Set the API key for admin-level access, using an environment variable
    .setKey(process.env.APPWRITE_API_KEY as string);

  // Return an object with a getter for the Appwrite Account service
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Destructure environment variables for Appwrite configuration
const { NEXT_PUBLIC_APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY } =
  process.env;

// Create a new instance of the Appwrite Client with project and API key configuration
const client = new Client()
  // Set the endpoint URL for the Appwrite server, using an environment variable
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  // Set the project ID for the Appwrite project, using an environment variable
  .setProject(APPWRITE_PROJECT_ID as string)
  // Set the API key for accessing Appwrite services, using an environment variable
  .setKey(APPWRITE_API_KEY as string);

// Create and export an instance of the Appwrite Databases service
export const databases = new Databases(client);
