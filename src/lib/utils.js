import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const simulateAsync = (time = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API response
      resolve();
    }, time); // 2000 milliseconds = 2 seconds
  });
};
