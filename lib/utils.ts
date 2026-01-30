import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidDomains() {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ") //nixon  lim -> nixon lim (remove excess space)
    .replace(/[^a-zA-Z\s'-]/g, "") //nixon!29lim -> nixonlim (remove number special characters)
    .replace(/\b\w/g, (char) => char.toUpperCase()); //nixon  lim -> Nixon Lim (upper case first)
}
