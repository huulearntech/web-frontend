import prisma from "@/lib/prisma";

// FIXME:
// export async function createReview(data: { hotelId: string; rating: number; body: string; userId: string }) {
//   return prisma.$transaction(async (tx) => {
//     const review = await tx.review.create({ data });

//     const hotel = await tx.hotel.findUnique({
//       where: { id: data.hotelId },
//       select: { rating: true, ratingCount: true },
//     });

//     const prevSum = hotel?.ratingSum ?? 0;
//     const prevCount = hotel?.ratingCount ?? 0;
//     const newSum = prevSum + data.rating;
//     const newCount = prevCount + 1;
//     await tx.hotel.update({
//       where: { id: data.hotelId },
//       data: {
//         ratingSum: newSum,
//         ratingCount: newCount,
//         rating: newSum / newCount,
//       },
//     });

//     return review;
//   });
// }