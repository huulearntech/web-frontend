"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function serializeRecentlyViewedHotel(rv: Awaited<ReturnType<typeof prisma.recentlyViewed.findMany<{
  where: { userId: string },
  orderBy: { viewedAt: "desc" },
  select: {
    hotel: {
      select: {
        id: true,
        name: true,
        imageUrls: true,
        reviewPoints: true,
        ward: { select: { name: true } },
        facilities: { select: { name: true } },
        rooms: { select: { price: true } },
      }
    }
  },
}>>>[number]) {
  const { hotel } = rv;

  return {
    id: hotel.id,
    name: hotel.name,
    thumbUrl: hotel.imageUrls?.[0] ?? "",
    reviewPoint: hotel.reviewPoints,
    numberOfReviews: 0, // TODO: add review count
    wardName: hotel.ward?.name ?? "",
    price: hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0].price.toString() : "0", // TODO: add price range
    facilities: (hotel.facilities ?? []).map(f => f.name),
    type: "bla", // TODO: add hotel type
  };
}

export async function fetchHotelsRecentlyViewedByUser() {
  const session = await auth();
  if (session?.user.role !== "USER") {
    // TODO: could show a "not authorized" message instead of just hiding the component
    return [];
  }

  const recentlyViewedRaw = await prisma.recentlyViewed.findMany({
    where: { userId: session.user.id },
    orderBy: { viewedAt: "desc" },
    select: {
      hotel: {
      select: {
        id: true,
        name: true,
        imageUrls: true,
        reviewPoints: true,
        ward: { select: { name: true } },
        facilities: { select: { name: true } },
        rooms: { select: { price: true } },
      }
      }
    },
    take: 10, // TODO: pagination
  });

  return recentlyViewedRaw.map(serializeRecentlyViewedHotel);
}