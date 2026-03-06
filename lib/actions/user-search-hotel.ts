"use server";

import prisma from "@/lib/prisma";

export async function fetchSearchResult() {
  return prisma.hotel.findMany({
    take: 12,
    include: {
      rooms: {
        select: {
          price: true,
          facilities: { select: { name: true } },
        }
      },
      ward: { select: { name: true } },
    }
  });
};

export type SearchResult = Awaited<ReturnType<typeof fetchSearchResult>>[number];