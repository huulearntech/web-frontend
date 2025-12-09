import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any> (
  func  : T,
  delay : number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined; // Holds the timeout ID

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this; // Preserve the context of `this`

    // Clear the previous timer if the function is called again
    clearTimeout(timeoutId);

    // Set a new timer
    timeoutId = setTimeout(() => {
      func.apply(context, args); // Execute the function with the correct context and arguments
    }, delay);
  };
}