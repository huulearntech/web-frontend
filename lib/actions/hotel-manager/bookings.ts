"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// Not sure if this should be paginated on server or client.
export async function hotelowner_getBookings() {
  const session = await auth();
  // TODO: Clarify this
  if (session?.user?.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }
	const [bookings, total] = await prisma.$transaction([
    prisma.booking.findMany({
      where: { hotel: { ownerId: session.user.id } },
      orderBy: { checkInDate: "desc" },
      include: {
        user: { select: { name: true } },
      },
    }),
    prisma.booking.count({
      where: { hotel: { ownerId: session.user.id } },
    }),
  ]);

  return {
    bookings: bookings.map((booking) => ({
      ...booking,
      totalPrice: booking.totalPrice.toString()
    })),
    total,
  };
};

export type BookingSerialized = Awaited<ReturnType<typeof hotelowner_getBookings>>['bookings'][number];


// TODO: Rename and make a consistent output shape, so that the table columns can be shared
export async function hotelowner_getUpcomingBookings() {
  const session = await auth();
  // TODO: Clarify this
  if (session?.user?.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }

  const today = new Date();
  return await prisma.booking.findMany({
    where: {
      hotel: { ownerId: session.user.id },
      checkInDate: {
        gte: today,
      },
    },
    orderBy: {
      checkOutDate: "desc",
    },
    take: 10, // limit to 10 upcoming bookings
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  }).then((bookings) =>
    bookings.map((booking) => ({
      ...booking,
      totalPrice: booking.totalPrice.toString(),
    }))
  );
}

export type UpcomingBooking = Awaited<ReturnType<typeof hotelowner_getUpcomingBookings>>[number];