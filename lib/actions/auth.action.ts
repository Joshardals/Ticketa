"use server";
import { AuthValidationType } from "@/typings/form";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "@/lib/appwrite.config";
import { createUserInfo } from "./database.action";
import { redirect } from "next/navigation";

// So this is a server action to get the current logged in user
export async function getCurrentUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error: any) {
    return error.message;
  }
}

// So this is a server action to sign in the user.
export async function signInUser(data: AuthValidationType) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      data.email!,
      data.password!
    );

    cookies().set("userSession", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // If Successful
    return { success: true };
  } catch (error: any) {
    return { success: false, msg: error.message };
  }
}

// This is a server action to signup the user. All these are coming from appwrite docs.
export async function signupUser(data: AuthValidationType) {
  try {
    const { account } = await createAdminClient();
    const response = await account.create(
      ID.unique(),
      data.email!,
      data.password!,
      data.fullname
    );

    await signInUser({ email: data.email, password: data.password }); // Sign In the User

    const { $id: userId, email } = response;

    await createUserInfo({
      userId,
      username: data.username!,
      email,
      name: data.fullname!,
      gender: data.gender!,
    }); // This partuclar createUserInfo function is just to create User Documents in the Database.

    return { success: true };
  } catch (error: any) {
    return { success: false, msg: error.message };
  }
}

// Another server action to Sign Out User
export async function signOutUser() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("userSession");
    await account.deleteSession("current");
  } catch (error: any) {
    return error.message;
  }

  redirect("/"); // This redirects the user to the homepage after a successful sign out.
}
