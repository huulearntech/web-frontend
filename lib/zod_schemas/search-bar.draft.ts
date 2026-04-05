import { z } from "zod";

export const SearchBarFormSchema = z.object({
  // TODO: handle location requirement gracefully in UI
  location: z.string().trim().min(1, "Địa điểm không được để trống"),
  inOutDates: z.object({
    from: z.date(),
    to: z.date(),
  }).superRefine(({ from, to }, ctx) => {
    if (from > to) {
      ctx.addIssue({
        code: "custom",
        message: "Ngày nhận phòng phải trước ngày trả phòng",
        path: ["to"],
      });
    }
  }).transform(({ from, to }) => ({
    // normalize to YYYY-MM-DD string
    from: from.toISOString().split("T")[0],
    to: to.toISOString().split("T")[0],
  })),
  guestsAndRooms: z.object({
    numAdults: z.number().min(1).max(30),
    numChildren: z.number().min(0).max(6),
    numRooms: z.number().min(1).max(30),
  }).superRefine(({ numAdults, numRooms }, ctx) => {
    if ( numRooms > numAdults ) {
      ctx.addIssue({
        code: "custom",
        message: "Số phòng không được nhiều hơn số khách người lớn",
        path: ["numRooms"],
      });
    }
  }),
});


export type SearchBar_FormInput  = z.input<typeof SearchBarFormSchema>;
export type SearchBar_FormOutput = z.output<typeof SearchBarFormSchema>;



// This is really bloated.
export type SearchSpecs = {
  location: string,
  checkInDate: string,
  checkOutDate: string,
  numAdults: string,
  numChildren: string,
  numRooms: string,
}

const SearchInputSchema = z.object({
  location: z.string(),
  inOutDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guestsAndRooms: z.object({
    numAdults: z.string(),
    numChildren: z.string(),
    numRooms: z.string(),
  }),
});

const SearchSpecsSchema = z.object({
  location: z.string(),
  checkInDate: z.iso.date(),
  checkOutDate: z.iso.date(),
  numAdults: z.string(),
  numChildren: z.string(),
  numRooms: z.string(),
});


export const SearchSpecsCodec = z.codec(
  SearchSpecsSchema,
  SearchInputSchema,
  {
    encode(data) {
      return {
        location: data.location,
        checkInDate: data.inOutDates.from.toISOString().split("T")[0],
        checkOutDate: data.inOutDates.to.toISOString().split("T")[0],
        numAdults: data.guestsAndRooms.numAdults.toString(),
        numChildren: data.guestsAndRooms.numChildren.toString(),
        numRooms: data.guestsAndRooms.numRooms.toString(),
      };
    },

  decode(input) {
    const {
      location,
      checkInDate,
      checkOutDate,
      numAdults,
      numChildren,
      numRooms,
    } = input;

    return SearchInputSchema.parse({
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