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
                select: {
                  name: true,
                  country: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  return hotel;
}

