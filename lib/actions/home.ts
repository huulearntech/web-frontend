"use server";

import { HotelCardProps } from "@/lib/definitions";
import prisma from "@/lib/prisma";

type UnserializedHotel = Awaited<ReturnType<typeof prisma.hotel.findMany<{
  take: number,
  where: { ward: { district: { provinceId: string } } },
  select: {
    id: true,
    name: true,
    imageUrls: true,
    reviewPoints: true,
    numberOfReviews: true,
    type: true,
    ward: { select: { name: true } },
    facilities: { select: { name: true } },
    rooms: {
      select: {
        price: true,
      },
      orderBy: {
        price: "asc",
      },
      take: number,
    },
  },
}>>>[number];

function serializeHotel(hotel: UnserializedHotel) : HotelCardProps {
  return {
    id: hotel.id,
    name: hotel.name,
    thumbUrl: hotel.imageUrls[0],
    reviewPoint: 0,
    numberOfReviews: 0,
    wardName: hotel.ward.name,
    price: hotel.rooms.length > 0 ? hotel.rooms[0].price.toString() : "0",
    facilities: hotel.facilities.map(f => f.name),
    type: "hotel",
  };
}

type FeedProps = { title: string, locations: { provinceName: string, hotels: HotelCardProps[] }[] };

export async function fetchFeed(): Promise<FeedProps> {
  const provinceIds = await prisma.province.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
    },
  });

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
        ward: { select: { name: true } },
        facilities: { select: { name: true, iconUrl: true }},
        rooms: {
          select: {
            price: true,
          },
          orderBy: {
            price: "asc",
          },
          take: 1,
        },
      },
    }).then(hotels => ({ provinceName: name, hotels: hotels.map(h => serializeHotel(h))}))
  ));
  // const feed = provincesWithHotels.map(({ provinceName, hotels }) => {
  //   // hotels were already serialized above via serializeHotel; just take up to 10
  //   const sliced = hotels.slice(0, 10);
  //   return {
  //     name: provinceName,
  //     hotels: sliced,
  //   };
  // });

  return {
    title: "Top destinations",
    locations: provincesWithHotels,
  };
}

