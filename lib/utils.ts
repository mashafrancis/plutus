import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fancyId() {
  return Math.floor(100000000 * Math.random()).toString(36);
}

export function noop() {}
