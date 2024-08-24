// import { getCurrentUser } from "@/lib/actions/auth/auth.actions";
import { MainHeader } from "@/components/shared/MainHeader";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home | Ticketa",
  description:
    "Welcome to Ticketa! Discover and explore a variety of student events, from parties to concerts, all in one place. Start your journey by browsing upcoming events and securing your tickets today.",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = await getCurrentUser();
  //   if (!user) redirect("/");

  return (
    <main>
      {/* <MainHeader /> */}
      <div className="bg-darkCharcoal">{children}</div>
    </main>
  );
}
