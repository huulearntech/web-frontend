"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function fetchBookingsSerialized() {
  const session = await auth();
  // TODO: Clarify this
  if (session?.user?.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }
	const bookings = await prisma.booking.findMany({
		where: { hotel: { ownerId: session.user.id } },
		orderBy: { startDate: "desc" },
		include: {
			user: { select: { name: true } },
		},
	});

	return bookings.map((booking) => ({
		...booking,
		totalPrice: booking.totalPrice.toString(),
	}));
};

export type BookingSerialized = Awaited<ReturnType<typeof fetchBookingsSerialized>>[number];


// TODO: Rename and make a consistent output shape, so that the table columns can be shared
export async function fetchUpcomingBookings() {
  const session = await auth();
  // TODO: Clarify this
  if (session?.user?.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }

  const today = new Date();
  return await prisma.booking.findMany({
    where: {
      hotel: { ownerId: session.user.id },
      startDate: {
        gte: today,
      },
    },
    orderBy: {
      startDate: "desc",
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

export type UpcomingBooking = Awaited<ReturnType<typeof fetchUpcomingBookings>>[number];