"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function fetchHotelsRecentlyViewedByUser() {
  const session = await auth();
  if (session?.user.role !== "USER") {
    // TODO: could show a "not authorized" message instead of just hiding the component
    return [];
  }

  return prisma.recentlyViewed.findMany({
    where: { userId: session.user.id },
    orderBy: { viewedAt: "desc" },
    select: {
      hotel: {
        select: {
          id: true,
          name: true,
          imageUrls: true,
          reviewPoints: true,
          numberOfReviews: true,
          ward: { select: { name: true } },
          facilities: { select: { name: true } },
          rooms: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
          type: true,
        }
      }
    },
    take: 10, // TODO: pagination
  }).then(recentlyViewedEntries => recentlyViewedEntries.map(entry => ({
    ...entry.hotel,
    rooms: entry.hotel.rooms.map(r => ({ ...r, price: r.price.toString() })),
  })));
}