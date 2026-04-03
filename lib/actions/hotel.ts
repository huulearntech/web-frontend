"use server";

import prisma from "@/lib/prisma";

export async function fetchHotel(hotelId: string) {
  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: {
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
  fromDate: Date,
  toDate: Date,
  numRooms: number,
  numAdults: number
) {

  return prisma.roomType.findMany({
    where: {
      hotelId,
      rooms: {
        none: {
          bookingRooms: {
            some: {
              booking: {
                AND: [
                  { checkInDate: { lt: toDate } },
                  { checkOutDate: { gt: fromDate } },
                  { status: { in: ["CONFIRMED", "PENDING"] } }, // be cautious!
                ],
              },
            },
          },
        },  
      },
    },
    include: {
      rooms: {
        where: {
          bookingRooms: {
            none: {
              booking: {
                AND: [
                  { checkInDate: { lt: toDate } },
                  { checkOutDate: { gt: fromDate } },
                  { status: { in: ["CONFIRMED", "PENDING"] } }, // be cautious!
                ],
              },
            },
          },
        },
        select: {
          _count: {
            select: { bookingRooms: true },
          },
          imageUrls: true,
        },
      },
    },
    orderBy: { price: "asc" }, // optional: sort cheapest first within each type
  });
}

export type FetchHotelResult = Awaited<ReturnType<typeof fetchHotel>>;

export type FetchAvailableRoomsResult = Awaited<ReturnType<typeof getRoomsByHotelIdGroupedByType>>;