import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const darkColors = [
  "#1D3557", // Navy Blue
  "#2A9D8F", // Emerald Green
  "#6D6875", // Cool Gray
  "#333333", // Dark Charcoal
  "#264653", // Dark Teal
  "#14213D", // Deep Navy
  "#3A3A3A", // Charcoal Gray
  "#383838", // Slate Gray
];

export function getColorForId(id: string) {
  const hash = id
    .split("")
    .reduce((acc: any, char: any) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % darkColors.length;
  return darkColors[colorIndex];
}
