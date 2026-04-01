import { z } from "zod";

export const SearchBarFormSchema = z.object({
  // TODO: handle location requirement gracefully in UI
  location: z.string().trim().min(1, { message: "Location is required" }),
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

export type SearchBarFormData = z.infer<typeof SearchBarFormSchema>;