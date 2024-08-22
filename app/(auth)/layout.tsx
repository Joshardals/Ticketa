import { Header } from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Ticketa",
  description:
    "Log in to your Ticketa account and access student events—browse, buy, and manage your tickets effortlessly.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
