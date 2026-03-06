import prisma from "@/lib/prisma";
import type { BookingSerialized } from "@/lib/actions/hotel-manager/bookings";
export type TmpBooking = Omit<BookingSerialized, "user"> & { hotelName: string };

export const fetchTmpBookings = async (userId: string): Promise<TmpBooking[]> => {
  "use server";
  const bookingsRaw = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      hotel: {
        select: { name: true }
      }
    }
  });
  const bookings: TmpBooking[] = bookingsRaw.map(b => ({
    id: b.id,
    userId: b.userId,
    hotelId: b.hotelId,
    hotelName: b.hotel.name,
    startDate: b.startDate,
    endDate: b.startDate,
    status: b.status,
    totalPrice: b.totalPrice.toString(),
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
    notes: b.notes,
  }));
  return bookings;
}