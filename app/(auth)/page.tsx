import { LoginForm } from "@/components/form/LoginForm";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Ticketa",
  description:
    "Log in to your Ticketa account and access student events—browse, buy, and manage your tickets effortlessly.",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/home");
  return (
    <main className="px-5 maxCenter contentCenter w-full">
      <div className="mb-8 text-center">
        <h2 className="text-xl max-md:text-lg font-bold">Welcome to Ticketa</h2>
        <p className="text-pretty">
          Your gateway to student events—log in to browse and manage your
          tickets.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
