import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = "https://ticketa-sigma.vercel.app/";
// export const BASE_URL = "http://localhost:3000/";

export function formatDate(isoString: string): string {
  // Parse the date string without timezone adjustments
  const date = new Date(isoString);

  // Manually format the parts of the date
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
  const formattedHours = String(hours).padStart(2, "0");

  return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

// You don't need to know what the code above does, it is basically just formatting the date properly. (Dont't waste your time trying to understnad it.)

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

// a tiny utility function that converts a price in dollars (or any other currency) to its subunit in cents
export function formatSubCurrency(price: number): number {
  return Math.round(price * 100);
}
