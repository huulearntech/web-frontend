import { SearchBarFormSchema } from "@/lib/zod_schemas/search-bar";
import z from "zod";

export type SearchParams = {
  location: string,
  checkInDate: string,
  checkOutDate: string,
  numAdults: string,
  numChildren: string,
  numRooms: string,
}

export const SearchParamsCodec = z.codec(
  z.object({
    location:     z.string(),
    checkInDate:  z.iso.date(),
    checkOutDate: z.iso.date(),
    numAdults:    z.string(),
    numChildren:  z.string(),
    numRooms:     z.string(),
  }),
  SearchBarFormSchema,
  {
  encode(data: z.infer<typeof SearchBarFormSchema>) {
    return {
      location:     data.location,
      checkInDate:  data.inOutDates.from.toISOString().split("T")[0],
      checkOutDate: data.inOutDates.to.toISOString().split("T")[0],
      numAdults:    data.guestsAndRooms.numAdults.toString(),
      numChildren:  data.guestsAndRooms.numChildren.toString(),
      numRooms:     data.guestsAndRooms.numRooms.toString(),
    };
  },

  decode(input: SearchParams): z.infer<typeof SearchBarFormSchema> {
    const {
      location,
      checkInDate,
      checkOutDate,
      numAdults,
      numChildren,
      numRooms,
    } = input;

    return SearchBarFormSchema.parse({
      location,
      inOutDates: {
        from: new Date(checkInDate),
        to: new Date(checkOutDate),
      },
      guestsAndRooms: {
        numAdults: parseInt(numAdults, 10) || 2,
        numChildren: parseInt(numChildren, 10) || 0,
        numRooms: parseInt(numRooms, 10) || 1,
      },
    });
  },
});