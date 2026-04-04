"use server";

import prisma from "@/lib/prisma";


export async function fetchPage(page: number, pageSize = 12) {
  // ensure sane values
  page = Math.max(1, Math.floor(page));
  pageSize = Math.max(1, Math.floor(pageSize));

  const where = {}; // Filter and location.
  const offset = (page - 1) * pageSize;

  // const numRooms = 3; // example
  const [rawItems, total] = await prisma.$transaction([
    prisma.hotel.findMany({
      where,
      orderBy: { id: "asc" },

      skip: offset,
      take: pageSize,

      select: {
        id: true,
        name: true,
        imageUrls: true,
        reviewPoints: true,
        numberOfReviews: true,
        ward: { select: { name: true, district: { select: { province: { select: { name: true } } } } }, },
        facilities: { select: { name: true } },
        // fetch room types with a rooms-count so we can pick only those with >= numRooms
        roomTypes: {
          select: {
            price: true,
            // _count: { select: { rooms: true } },
          },
          orderBy: { price: "asc" },
        },
        type: true,
      },
    }),
    prisma.hotel.count({ where }),
  ]);

  return {
    items: rawItems.map(hotel => ({
      ...hotel,
      roomTypes: hotel.roomTypes.map(r => ({ ...r, price: r.price.toNumber() })),
    })),
    total
  };
}

export type HotelCardProps = Awaited<ReturnType<typeof fetchPage>>["items"][number];