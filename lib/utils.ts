import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fancyId() {
  return Math.floor(100_000_000 * Math.random()).toString(36);
}

export function noop() {}

export const notReachable = (_: never): never => {
  throw new Error("Impossible state reached");
};

export function isNonEmptyArray<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0;
}
