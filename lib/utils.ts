import { type ClassValue, clsx } from "clsx";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}