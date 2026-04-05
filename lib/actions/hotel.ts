"use server";

import prisma from "@/lib/prisma";

export async function fetchHotel(hotelId: string) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
      roomTypes: {
        select: { price: true },
        orderBy: { price: "asc" },
        take: 1, // only need the cheapest room for the overview section
      },
      ward: {
        select: {
          name: true,
          district: {
            select: {
              name: true,
              province: {
                select: { name: true, },
              },
            },
          },
        },
      },
      facilities: {
        select: {
          name: true,
          iconUrl: true,
        },
      },
      // TODO: handle pagination or separate the query for fetching reviews
      // This following is for overview section.
      bookings: {
        take: 5,
        orderBy: { createdAt: "desc" },
        where: { review: { isNot: null } },
        select: {
          id: true,
          review: {
            select: {
              rating: true,
              comment: true,
              createdAt: true,
            }
          },
          user: {
            select: {
              name: true,
              profileImageUrl: true,
            }
          }
        }
      },
    },
  });
}

export async function getRoomsByHotelIdGroupedByType(
  hotelId: string,
  checkInDate: Date,
  checkOutDate: Date,
  numRooms: number,
  numAdults: number
) {

  return prisma.roomType.findMany({
    where: {
      hotelId,
      rooms: {
        none: {
          bookings: {
            some: {
              AND: [
                { checkInDate: { lt: checkOutDate } },
                { checkOutDate: { gt: checkInDate } },
                { status: { in: ["CONFIRMED", "PENDING", "CANCELLED"] } }, // The booking may be cancelled, but we still want to block the room for the booked dates to prevent overbooking. The hotel staff can manually unblock the room if needed.
              ],
            }
          }
        }
      },
    },
    include: {
      rooms: {
        where: {
          bookings: {
            none: {
              AND: [
                { checkInDate: { lt: checkOutDate } },
                { checkOutDate: { gt: checkInDate } },
                { status: { in: ["CONFIRMED", "PENDING", "CANCELLED"] } },
              ],
            },
          },
        },
        select: {
          _count: {
            select: { bookings: true },
          },
        },
      },
      facilities: {
        select: {
          id: true,
          name: true,
          iconUrl: true,
        },
      },
    },
    orderBy: { price: "asc" }, // optional: sort cheapest first within each type
  });
}

export type FetchHotelResult = Awaited<ReturnType<typeof fetchHotel>>;

export type FetchAvailableRoomsResult = Awaited<ReturnType<typeof getRoomsByHotelIdGroupedByType>>;