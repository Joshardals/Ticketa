import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

export const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Ticketa | Home",
  description:
    "Your gateway to student events—browse, buy, and manage tickets effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>{children}</body>
    </html>
  );
}
