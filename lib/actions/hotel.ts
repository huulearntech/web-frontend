"use server";

import prisma from "@/lib/prisma";

export const fetchHotel = async (hotelId: string) => {
  const hotel = await prisma.hotel.findUnique({
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
      rooms: {
        select: {
          id: true,
          name: true,
          type: true,
          areaM2: true,
          bedType: true,
          adultCapacity: true,
          childrenCapacity: true,
          price: true,
          imageUrls: true,
          facilities: true,
        },
        orderBy: { price: "asc" },
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
  return hotel;
}

export type FetchHotelResult = Awaited<ReturnType<typeof fetchHotel>>;