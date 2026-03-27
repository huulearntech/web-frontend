"use server";

import prisma from "@/lib/prisma";

// Neu lam cho cai nay ngan gon hon va tuan thu single source of truth thi hay nhi?
// Bay gio dang tao kieu thu cong sao cho no khop voi HotelCardProps.
function serializeHotel(hotel: Awaited<ReturnType<typeof prisma.hotel.findMany<{
  where: {},
  orderBy: { id: "asc" }, // TODO: add more sorting options
  take: number,
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
    facilities: { select: { name: true, iconUrl: true } },
    rooms: { include: { facilities: true } },
  },
}>>>[number]) {

  return {
    id: hotel.id,
    name: hotel.name,
    thumbUrl: hotel.imageUrls?.[0] ?? "",
    reviewPoint: hotel.reviewPoints,
    numberOfReviews: hotel.numberOfReviews,
    wardName: hotel.ward?.name ?? "",
    price: hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0].price.toString() : "0", // TODO: add price range
    facilities: (hotel.facilities ?? []).map(f => f.name),
    type: hotel.type,
  };
}


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
        facilities: { select: { name: true, iconUrl: true } },
        rooms: { include: { facilities: true } },
      },
    }),
    prisma.hotel.count({ where }),
  ]);

  const serializedItems = items.map(serializeHotel);
  return { items: serializedItems, total };
}

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