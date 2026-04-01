"use server";

import prisma from "@/lib/prisma";


export async function fetchPage(page: number, pageSize = 12) {
  // ensure sane values
  page = Math.max(1, Math.floor(page));
  pageSize = Math.max(1, Math.floor(pageSize));

  const where = {}; // Filter and location.
  const offset = (page - 1) * pageSize;

  // Use a transaction to fetch items + total in one round-trip.
  const [items, total] = await prisma.$transaction([
    prisma.hotel.findMany({
      where,
      orderBy: { id: "asc" },

      skip: offset,
      take: pageSize,

      select: {
        id: true,
        name: true,
        imageUrls: true,
        reviewPoints: true,
        numberOfReviews: true,
        ward: { select: { name: true, district: { select: { province: { select: { name: true } } } } }, },
        facilities: { select: { name: true } },
        rooms: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
        type: true,
      },
    }),
    prisma.hotel.count({ where }),
  ]);

  return {
    items: items.map(hotel => ({
      ...hotel,
      rooms: hotel.rooms.map(r => ({ ...r, price: r.price.toString() })),
    })),
    total
  };
}

export type HotelCardProps = Awaited<ReturnType<typeof fetchPage>>["items"][number];

  // // FIXME: Something is wrong here.
  // const cursorRow = await prisma.hotel.findMany({ // Why fetch two times?
  //   skip: offset,
  //   orderBy: { id: "asc" },
  //   take: 1,
  //   select: { id: true },
  // });

  // if (cursorRow.length === 0) {
  //   items = [];
  // } else {
  //   const cursorId = cursorRow[0].id;
  //   items = await prisma.hotel.findMany({
  //     cursor: { id: cursorId },
  //     skip: 1, // skip the cursor row itself
  //     orderBy: { id: "asc" },
  //     take: pageSize,
  //     include: {
  //       ward: {
  //         select: {
  //           name: true,
  //           district: {
  //             select: {
  //               name: true,
  //               province: {
  //                 select: {
  //                   name: true,
  //                   country: { select: { name: true } },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       facilities: { select: { name: true, iconUrl: true } },
  //       rooms: { include: { facilities: true } },
  //     },
  //   });
  // }

  // return { items, total };