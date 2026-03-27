"use server";

import prisma from "@/lib/prisma";
import { HotelCardProps } from "@/lib/definitions";
import { PaginationState } from "@tanstack/react-table";

// TODO: Clean up this type
type SortType = "price-asc" | "price-desc" | "reviewPoint-asc" | "numberOfReviews-desc";

function fetchHotelsUnserialized(pagination?: PaginationState, sort?: SortType) {
  if (!pagination) pagination = { pageIndex: 0, pageSize: 10 };

  return prisma.hotel.findMany({
    take: pagination.pageSize,
    include: {
      rooms: {
        select: {
          price: true,
          facilities: { select: { name: true } },
        },
        orderBy: {
          price: sort === "price-asc" ? "asc" : sort === "price-desc" ? "desc" : undefined,
        }
      },
      ward: { select: { name: true } },
    },
    // cursor: {
    //   id: pagination.pageIndex * pagination.pageSize,
    // },
  });
}

type UnserializedHotel = Awaited<ReturnType<typeof fetchHotelsUnserialized>>[number];

function serializeHotel(hotel: UnserializedHotel) : HotelCardProps {
  return {
    id: hotel.id,
    name: hotel.name,
    thumbUrl: hotel.imageUrls[0],
    reviewPoint: 0,
    numberOfReviews: 0,
    wardName: hotel.ward.name,
    price: hotel.rooms.length > 0 ? hotel.rooms[0].price.toString() : "0",
    facilities: hotel.rooms.length > 0 ? hotel.rooms[0].facilities.map(facility => facility.name) : [], // TODO: This is just a placeholder, we should have a better way to determine the facilities of a hotel, for example, we can take the union of all facilities of all rooms, or take the facilities of the most expensive room, etc.
    type: "hotel",
  };
}

export async function fetchSearchResult(
  pagination?: PaginationState,
  // filter: { },
  sort?: SortType
): Promise<HotelCardProps[]> {
  return fetchHotelsUnserialized(pagination, sort).then(hotels => hotels.map(serializeHotel));
};