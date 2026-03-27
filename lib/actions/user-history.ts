"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function fetchRecentBookings() {
  const session = await auth();
  if (session?.user.role !== "USER") {
    // TODO: Handle
    return [];
  }

  return prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      hotel: {
        select: { name: true }
      }
    }
  }).then(bookings => bookings.map(booking => ({
    ...booking,
    totalPrice: booking.totalPrice.toString(),
  })));
}

export type RecentBookingType = Awaited<ReturnType<typeof fetchRecentBookings>>[number];