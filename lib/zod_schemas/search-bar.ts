import { z } from "zod";

export const formSchema = z.object({
  // TODO: handle location requirement gracefully in UI
  location: z.string().min(1, { message: "Location is required" }),
  inOutDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guestsAndRooms: z.object({
    numAdults: z.number().min(1).max(30),
    numChildren: z.number().min(0).max(6),
    numRooms: z.number().min(1).max(30),
  }),
});

export type SearchBarFormData = z.infer<typeof formSchema>;


// TODO: use nextjs built-in internationalization support then clean up
export function formatDate(
  value: Date | string | undefined | null,
  locale: string = "vi-VN",
  opts?: Intl.DateTimeFormatOptions
) {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, opts ?? {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}