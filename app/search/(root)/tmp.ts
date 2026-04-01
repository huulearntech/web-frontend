import { SearchBarFormSchema } from "@/lib/zod_schemas/search-bar";
import z from "zod";

export type SearchParams = {
  location: string,
  fromDate: string,
  toDate: string,
  numAdults: string,
  numChildren: string,
  numRooms: string,
}

export const SearchParamsCodec = z.codec(
  z.object({
    location: z.string(),
    fromDate: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid fromDate format",
    }),
    toDate: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
      message: "Invalid toDate format",
    }),
    numAdults: z.string(),
    numChildren: z.string(),
    numRooms: z.string(),
  }),
  SearchBarFormSchema,
  {
  encode(data: z.infer<typeof SearchBarFormSchema>) {
    return {
      location: data.location,
      fromDate: data.inOutDates.from.toISOString(),
      toDate: data.inOutDates.to.toISOString(),
      numAdults: String(data.guestsAndRooms.numAdults),
      numChildren: String(data.guestsAndRooms.numChildren),
      numRooms: String(data.guestsAndRooms.numRooms),
    };
  },

  decode(input: SearchParams): z.infer<typeof SearchBarFormSchema> {
    const {
      location,
      fromDate,
      toDate,
      numAdults,
      numChildren,
      numRooms,
    } = input;

    return SearchBarFormSchema.parse({
      location,
      inOutDates: {
        from: new Date(fromDate),
        to: new Date(toDate),
      },
      guestsAndRooms: {
        numAdults: parseInt(numAdults, 10) || 0,
        numChildren: parseInt(numChildren, 10) || 0,
        numRooms: parseInt(numRooms, 10) || 0,
      },
    });
  },
});