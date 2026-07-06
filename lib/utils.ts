import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalized = (str: string | undefined) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ""
