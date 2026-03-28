"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function user_fetchFavoriteHotels() {
  const session = await auth();

  // Temporarily disable
  // if (session?.user.role !== "USER") {
  //   // TODO: could show a "not authorized" message
  //   return [];
  // }
  if (!session) {
    return [];
  }
  /////////////////////////////////


  const where = { userId: session.user.id };

  return prisma.favorite.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
    }).then(favs => favs.map(fav => ({
      ...fav.hotel,
      rooms: fav.hotel.rooms.map(r => ({ ...r, price: r.price.toString() })),
    })))
}