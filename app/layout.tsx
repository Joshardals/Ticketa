import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/Header";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Login | Ticketa",
  description:
    "Log in to your Ticketa account and access student events—browse, buy, and manage your tickets effortlessly.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
