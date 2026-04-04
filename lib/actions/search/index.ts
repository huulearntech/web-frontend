"use server";

import prisma from "@/lib/prisma";
import { type PaginationState } from "@tanstack/react-table";
import { type SearchBarFormData } from "@/lib/zod_schemas/search-bar";

import { getHotelsBySearchBarForm } from "@/lib/generated/prisma/sql";
import { HotelCardProps } from "@/app/search/(root)/tmp-action";

type SortType = "price-asc" | "price-desc" | "reviewPoints-desc";

// TODO: filter here is in fact the search bar, the filter is another one.
export async function fetchSearchResult(
  filter: SearchBarFormData,
  pagination?: PaginationState,
  sort?: SortType
): Promise<HotelCardProps[]> {
  if (!pagination) pagination = { pageIndex: 0, pageSize: 10 };

  const {
    location,
    inOutDates: { from, to },
    guestsAndRooms: { numAdults, numChildren, numRooms }
  } = filter;

  // const pageIndex = pagination.pageIndex ?? 0;
  // const pageSize = pagination.pageSize ?? 10;
  // const offset = pageIndex * pageSize;
  // const limit = pageSize;

  // TODO: Pagination, sort, facilities
  return prisma.$queryRawTyped(getHotelsBySearchBarForm(
    location,
    from,
    to,
    numAdults,
    numRooms,
    sort as string
  )).then((hotels) => hotels.map((hotel) => {
    console.log(hotel);
    return {
    id: hotel.id,
    type: hotel.type,
    name: hotel.name,
    reviewPoints: hotel.reviewPoints,
    numberOfReviews: hotel.numberOfReviews,
    roomTypes: [{ price: hotel.minPrice?.toNumber() ?? 0 }],
    ward: {
      name: hotel.wardName,
      district: { province: { name: hotel.provinceName } }
    },
    imageUrls: hotel.imageUrls ?? [],
    facilities: hotel.facilities?.map(facilityName => ({ name: facilityName })) ?? []
  }}));
}