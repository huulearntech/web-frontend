import { format } from "date-fns";
import type { BookingStatus } from "./columns";


/* ---------- Helpers ---------- */
export const currency = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export const statusColor = (s: BookingStatus) =>
  s === "confirmed"
    ? "bg-green-100 text-green-800"
    : s === "pending"
    ? "bg-yellow-100 text-yellow-800"
    : s === "cancelled"
    ? "bg-red-100 text-red-800"
    : "bg-sky-100 text-sky-800";

export const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), "MMM d, yyyy");
  } catch {
    return iso;
  }
};