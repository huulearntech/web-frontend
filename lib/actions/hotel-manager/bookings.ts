"use server";
import prisma from "@/lib/prisma";

export const fetchBookingsSerialized = async (hotelId: string) => {
	const bookings = await prisma.booking.findMany({
		where: { hotelId },
		include: {
			user: { select: { name: true, email: true } },
		},
	});

	return bookings.map((booking) => ({
		...booking,
		totalPrice: booking.totalPrice.toString(),
	}));
};

export type BookingSerialized = Awaited<ReturnType<typeof fetchBookingsSerialized>>[number];