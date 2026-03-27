"use server";
import prisma from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";

const defaultSearchHotelsByBBoxParams = {
  select: {
    id: true,
    name: true,
    rooms: { select: { price: true }, take: 1, orderBy: { price: "asc" } },
    reviewPoints: true,
    numberOfReviews: true,
    imageUrls: true,
    latitude: true,
    longitude: true,
  },
  take: 50,
} as const;

export type BBox = {
  west: number;
  south: number;
  east: number;
  north: number;
}
type SearchHotelsByBBoxRow = Prisma.HotelGetPayload<typeof defaultSearchHotelsByBBoxParams>;

function serializeSearchHotelsByBBoxResult(hotel: SearchHotelsByBBoxRow) {
  return {
    id: hotel.id,
    name: hotel.name,
    price: hotel.rooms[0]?.price.toNumber() ?? null, // price of the cheapest room or null if no rooms
    reviewPoints: hotel.reviewPoints,
    numberOfReviews: hotel.numberOfReviews,
    imageUrl: hotel.imageUrls[0] ?? null, // use the first image as thumbnail
    latitude: hotel.latitude,
    longitude: hotel.longitude,
  }
}

export async function searchHotelsByBBox(bbox: BBox) {
  const { west, south, east, north } = bbox;

  const where =
    west <= east
      ? {
          latitude: { gte: south, lte: north },
          longitude: { gte: west, lte: east },
        }
      : {
          latitude: { gte: south, lte: north },
          // When the bounding box crosses the antimeridian, select hotels with longitude >= west OR longitude <= east
          OR: [{ longitude: { gte: west } }, { longitude: { lte: east } }],
        };

  const hotels = await prisma.hotel
    .findMany(defaultSearchHotelsByBBoxParams)
    .then(hotels => hotels.map(serializeSearchHotelsByBBoxResult));

  return hotels;
}

export type SearchHotelsByBBoxResult = Awaited<ReturnType<typeof searchHotelsByBBox>>[number];
