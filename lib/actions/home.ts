"use server";

import { HotelCardProps } from "@/app/search/(root)/tmp-action";
import prisma from "@/lib/prisma";


type FeedProps = { title: string, locations: { provinceName: string, hotels: HotelCardProps[] }[] };

export async function fetchFeed(): Promise<FeedProps> {
  const provinceIds = await prisma.province.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
    },
  });

  // FIXME: Error prone, must match the HotelCardProps.
  const provincesWithHotels = await Promise.all(provinceIds.map(({ id, name }) =>
    prisma.hotel.findMany({
      take: 10,
      where: { ward: { district: { provinceId: id } } },
      select: {
        id: true,
        name: true,
        imageUrls: true,
        reviewPoints: true,
        numberOfReviews: true,
        type: true,
        ward: { select: { name: true, district: { select: { province: { select: { name: true } } } } }, },
        facilities: { select: { name: true, iconUrl: true }},
        roomTypes: {
          select: {
            price: true,
          },
          orderBy: {
            price: "asc",
          },
          take: 1,
        },
      },
    }).then(hotels => ({
      provinceName: name, hotels: hotels.map(hotel => ({
        ...hotel,
        roomTypes: hotel.roomTypes.length > 0 ? hotel.roomTypes.map(rt => ({ price: rt.price.toNumber() })) : [{ price: 0 }],
      }))
    }))
  ));

  return {
    title: "Top destinations",
    locations: provincesWithHotels,
  };
}