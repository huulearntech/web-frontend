// AI-generated slop. Definitely contains errors.

"use server";

import prisma from "@/lib/prisma";
import { HotelCardProps } from "@/app/search/(root)/tmp-action";
import { PaginationState } from "@tanstack/react-table";
import { SearchBarFormData } from "@/lib/zod_schemas/search-bar";

type SortType = "price-asc" | "price-desc" | "reviewPoints-asc" | "numberOfReviews-desc";

export async function fetchSearchResult(
  filter: SearchBarFormData,
  pagination?: PaginationState,
  sort?: SortType
): Promise<HotelCardProps[]> {
  if (!pagination) pagination = { pageIndex: 0, pageSize: 10 };

  const { numAdults, numChildren, numRooms } = filter.guestsAndRooms;

  // room-level condition that a room must satisfy
  const roomWhere = {
    OR: [
      {
        AND: [
          { adultCapacity: { gte: numAdults } },
          { childrenCapacity: { gte: numChildren } },
        ],
      },
      {
        AND: [{ adultCapacity: { gte: numAdults + numChildren } }],
      },
    ],
  };

  // 1) Find hotelIds that have at least `numRooms` rooms matching roomWhere (client-side aggregation)
  const rooms = await prisma.room.findMany({
    where: roomWhere,
    select: { hotelId: true },
  });

  const hotelCount = new Map<string, number>();
  for (const r of rooms) {
    const id = String(r.hotelId);
    hotelCount.set(id, (hotelCount.get(id) ?? 0) + 1);
  }

  const hotelIds = Array.from(hotelCount.entries())
    .filter(([, cnt]) => cnt >= numRooms)
    .map(([id]) => id);

  if (hotelIds.length === 0) return [];

  // 2) Fetch hotels restricted to those ids (apply DB-side ordering when simple)
  const orderBy: Partial<Record<"reviewPoints" | "numberOfReviews", "asc" | "desc">> = {};
  if (sort === "reviewPoints-asc") orderBy.reviewPoints = "asc";
  if (sort === "numberOfReviews-desc") orderBy.numberOfReviews = "desc";

  const hotels = await prisma.hotel.findMany({
    where: {
      id: { in: hotelIds },
      rooms: { some: {} }, // Only include hotels with at least one room
    },
    take: pagination.pageSize,
    skip: pagination.pageIndex * pagination.pageSize,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    select: {
      id: true,
      name: true,
      imageUrls: true,
      reviewPoints: true,
      numberOfReviews: true,
      ward: { select: { name: true, district: { select: { province: { select: { name: true } } } } } },
      facilities: { select: { name: true } },
      // get cheapest room price for display
      rooms: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
      type: true,
      _count: { select: { rooms: true } },
    },
  });

  // 3) Client-side final mapping and optional price-based sorting (price sorting is easiest on fetched page)
  const mapped: HotelCardProps[] = hotels.map(hotel => {
    const rooms = hotel.rooms.map(({ price }) => ({ price: price.toString() }));
    return {
      id: hotel.id,
      name: hotel.name,
      imageUrls: hotel.imageUrls,
      reviewPoints: hotel.reviewPoints,
      numberOfReviews: hotel.numberOfReviews,
      ward: hotel.ward,
      facilities: hotel.facilities,
      // rooms for display: price as string
      rooms,
      type: hotel.type,
      _count: hotel._count,
    };
  });

  if (sort === "price-asc" || sort === "price-desc") {
    mapped.sort((a, b) => {
      const pa = Number(a.rooms[0]?.price ?? 0);
      const pb = Number(b.rooms[0]?.price ?? 0);
      return sort === "price-asc" ? pa - pb : pb - pa;
    });
  }

  return mapped;
}