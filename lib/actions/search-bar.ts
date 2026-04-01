"use server";

import prisma from "@/lib/prisma";

export async function user_getLocationOrHotelByQueryString(query: string) {
  return prisma.province.findMany({
    take: 5,
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
}

// export async function user_getLocationOrHotelByQueryString(query: string) {
//   let provinces = []
//   let districts = []
//   let wards = []
//   let hotels = []
//   provinces = await prisma.province.findMany({
//     take: 5,
//     where: {
//       name: {
//         contains: query,
//         mode: "insensitive",
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   });
//   if (provinces.length < 5) {
//     districts = await prisma.district.findMany({
//       take: 5 - provinces.length,
//       where: {
//         name: {
//           contains: query,
//           mode: "insensitive",
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         provinceId: true,
//       },
//     });
//   }
//   if (provinces.length + districts.length < 5) {
//     wards = await prisma.ward.findMany({
//       take: 5 - provinces.length - districts.length,
//       where: {
//         name: {
//           contains: query,
//           mode: "insensitive",
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         districtId: true,
//       },
//     });
//   }
//   if (provinces.length + districts.length + wards.length < 5) {
//     hotels = await prisma.hotel.findMany({
//       take: 5 - provinces.length - districts.length - wards.length,
//       where: {
//         name: {
//           contains: query,
//           mode: "insensitive",
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         provinceId: true,
//         districtId: true,
//         wardId: true,
//       },
//     });
//   }
//   return {
//     provinces,
//     districts,
//     wards,
//     hotels,
//   };
// }