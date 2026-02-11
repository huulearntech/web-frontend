import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  function debounced(...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, wait);
  }
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced as T & { cancel: () => void };
}

export function simulateFetchLocations(query: string, delay = 400): Promise<string[]> {
  const all = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Miami",
    "San Francisco",
    "Seattle",
    "Boston",
    "Denver",
    "Atlanta",
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = all.filter((loc) =>
        loc.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, delay);
  });
}