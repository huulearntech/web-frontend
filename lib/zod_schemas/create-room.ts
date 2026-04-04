// Resolve the ambiguity of field array between zod and react-hook-form.
import { z } from "zod";
import { BedType } from "@/lib/generated/prisma/browser";

// Transformation on client-side to reduce payload (for a bit).
export const RoomFormSchema = z.object({
  name:             z.string().min(1, "Name is required"),
  type:             z.string(),
  adultCapacity:    z.coerce.number().int(),
  childrenCapacity: z.coerce.number().int(),
  areaM2:           z.coerce.number(),
  bedType:          z.enum(Object.values(BedType)),
  price:            z.coerce.number(),
  imageUrls:        z.object({ url: z.url() }).array().transform((arr) => arr.map((item) => item.url)),
})

export type RoomFormInput = z.input<typeof RoomFormSchema>;
export type RoomFormOutput = z.output<typeof RoomFormSchema>;
export type RoomFormValues = z.infer<typeof RoomFormSchema>;


export const MultiRoomFormSchema = z.object({
  rooms: RoomFormSchema.array().min(1, "At least one room is required"),
}).transform((data) => data.rooms);

export type MultiRoomFormInput = z.input<typeof MultiRoomFormSchema>;
export type MultiRoomFormOutput = z.output<typeof MultiRoomFormSchema>;