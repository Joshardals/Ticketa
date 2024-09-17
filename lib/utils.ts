import { type ClassValue, clsx } from "clsx"; // Import types and function from clsx for conditional classNames
import { twMerge } from "tailwind-merge"; // Import function from tailwind-merge for merging Tailwind CSS classes

/**
 * Utility function to conditionally join class names using clsx and merge with tailwind-merge.
 *
 * @param {...ClassValue[]} inputs - Class names or conditional class names to be merged.
 * @returns {string} - Merged and formatted class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs)); // Merges and formats class names
}

// Base URL for the application. The commented line is for local development.
export const BASE_URL = "https://ticketa-sigma.vercel.app/";
// export const BASE_URL = "http://localhost:3000/";

/**
 * Formats an ISO date string into a more readable format (MM/DD/YYYY hh:mm AM/PM).
 *
 * @param {string} isoString - The ISO date string to be formatted.
 * @returns {string} - The formatted date string.
 */
export function formatDate(isoString: string): string {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Extract and format date components
  const year = date.getUTCFullYear(); // Get the year
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Get month (1-based index) and pad to 2 digits
  const day = String(date.getUTCDate()).padStart(2, "0"); // Get day and pad to 2 digits

  let hours = date.getUTCHours(); // Get hours in 24-hour format
  const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Get minutes and pad to 2 digits

  // Determine AM/PM and convert hours to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time, with 0 becoming 12
  const formattedHours = String(hours).padStart(2, "0"); // Pad hours to 2 digits

  // Return formatted date string
  return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

// Note: This comment can be omitted as it is not necessary for understanding the functionality of formatDate.

/**
 * Formats a number as a price string in USD (e.g., "$1,234.56").
 *
 * @param {number} price - The price value to format.
 * @returns {string} - The formatted price string.
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`; // Format price with two decimal places
}

/**
 * Converts a price in dollars (or any other currency) to its subunit in cents.
 *
 * @param {number} price - The price in dollars to convert.
 * @returns {number} - The price in cents.
 */
export function formatSubCurrency(price: number): number {
  return Math.round(price * 100); // Convert dollars to cents
}
