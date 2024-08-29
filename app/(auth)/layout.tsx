import { Header } from "@/components/shared/Header";
import { Metadata } from "next";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
