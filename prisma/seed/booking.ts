import { BookingStatus, Prisma } from "@/lib/generated/prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

import prisma from "@/lib/prisma";

import { faker } from "@faker-js/faker";


async function seedBookings(data: { userId: string, hotelId: string }[]) {
  if (data.length === 0) {
    console.warn("No data provided for seeding bookings. Skipping.");
    return [];
  }
  const half = Math.floor(data.length / 2);

  const pastBookings: Prisma.BookingUncheckedCreateInput[]
    = data.slice(0, half).map(({ userId, hotelId }) => {
      const checkOutDate = faker.date.recent();
      const checkInDate = faker.date.recent({ refDate: checkOutDate });
      return {
        userId,
        hotelId,
        checkInDate,
        checkOutDate,
        snapshotRoomPrice: Decimal(faker.number.int({ min: 100_000, max: 1_000_000, multipleOf: 1_000 })),
        status: faker.helpers.arrayElement(["CANCELLED", "COMPLETED"] as BookingStatus[]),
        createdAt: faker.date.recent({ refDate: checkInDate }),
      };
    });

  const upcomingBookings: Prisma.BookingUncheckedCreateInput[]
    = data.slice(half).map(({ userId, hotelId }) => {
      const checkInDate = faker.date.soon();
      const checkOutDate = faker.date.soon({ refDate: checkInDate });
      return {
        userId,
        hotelId,
        checkInDate,
        checkOutDate,
        snapshotRoomPrice: Decimal(faker.number.int({ min: 100_000, max: 1_000_000, multipleOf: 1_000 })),
        status: faker.helpers.arrayElement(["DRAFT", "PENDING", "CONFIRMED"] as BookingStatus[]),
        createdAt: faker.date.recent({ refDate: checkInDate }),
      };
    });

  return prisma.booking.createManyAndReturn({
    data: [...pastBookings, ...upcomingBookings]
  });
}

async function seedReviews() {
  const bookings = await prisma.booking.findMany({
    where: {
      status: "COMPLETED",
    },
    select: {
      id: true,
      hotelId: true,
    },
  });

  const reviews = bookings.map(({ id }) => ({
    bookingId: id,
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentences(2),
    createdAt: faker.date.recent(),
  }));

  await prisma.review.createMany({
    data: reviews,
  });
}

export { seedBookings, seedReviews };