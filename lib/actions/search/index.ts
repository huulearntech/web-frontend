"use server";

import prisma from "@/lib/prisma";
import { HotelCardProps } from "@/app/search/(root)/tmp-action";
import { PaginationState } from "@tanstack/react-table";

// TODO: Clean up this type
type SortType = "price-asc" | "price-desc" | "reviewPoint-asc" | "numberOfReviews-desc";

export async function fetchSearchResult(
  pagination?: PaginationState,
  // filter: { },
  sort?: SortType
): Promise<HotelCardProps[]> {
  if (!pagination) pagination = { pageIndex: 0, pageSize: 10 };

  return prisma.hotel.findMany({
    take: pagination.pageSize,
    // cursor: {
    //   id: pagination.pageIndex * pagination.pageSize,
    // },

    select: {
      id: true,
      name: true,
      imageUrls: true,
      reviewPoints: true,
      numberOfReviews: true,
      ward: { select: { name: true, district: { select: { province: { select: { name: true } } } } } },
      facilities: { select: { name: true } },
      rooms: { select: { price: true }, orderBy: { price: 'asc' }, take: 1, },
      type: true,
    },
  }).then(hotels => hotels.map(hotel => ({ ...hotel,
    rooms: hotel.rooms.map(r => ({ ...r, price: r.price.toString() })),
  })));
};