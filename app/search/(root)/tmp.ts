import { formSchema } from "@/lib/zod_schemas/search-bar";
import z from "zod";

export const SearchPage__SearchParamsCodec = z.codec(
  z.instanceof(URLSearchParams),
  formSchema,
  {
  encode(data: z.infer<typeof formSchema>): URLSearchParams {
    return new URLSearchParams({
      location: data.location,
      fromDate: data.inOutDates.from.toISOString(),
      toDate: data.inOutDates.to.toISOString(),
      numAdults: String(data.guestsAndRooms.numAdults),
      numChildren: String(data.guestsAndRooms.numChildren),
      numRooms: String(data.guestsAndRooms.numRooms),
    });
  },

  decode(input: URLSearchParams): z.infer<typeof formSchema> {
    const params = new URLSearchParams(input);
    const {
      location,
      fromDate,
      toDate,
      numAdults = "0",
      numChildren = "0",
      numRooms = "0",
    } = Object.fromEntries(params.entries());

    return formSchema.parse({
      location,
      inOutDates: {
        from: new Date(fromDate),
        to: new Date(toDate),
      },
      guestsAndRooms: {
        numAdults: parseInt(numAdults, 10),
        numChildren: parseInt(numChildren, 10),
        numRooms: parseInt(numRooms, 10),
      },
    });
  },
});