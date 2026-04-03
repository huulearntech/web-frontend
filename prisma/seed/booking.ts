import { BookingStatus } from "@/lib/generated/prisma/client";
import { Decimal } from "@prisma/client/runtime/client";

import prisma from "@/lib/prisma";

import { faker } from "@faker-js/faker";


async function seedBookings(data: { userId: string, hotelId: string }[]) {
  if (data.length === 0) {
    console.warn("No data provided for seeding bookings. Skipping.");
    return [];
  }
  const half = Math.floor(data.length / 2);

  const pastBookings = data.slice(0, half).map(({ userId, hotelId }) => {
    const checkOutDate = faker.date.recent();
    const checkInDate = faker.date.recent({ refDate: checkOutDate });
    return {
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      totalPrice: Decimal(faker.number.int({ min: 100_000, max: 1_000_000, multipleOf: 1_000 })), // VND
      status: faker.helpers.arrayElement(["CANCELLED", "COMPLETED"] as BookingStatus[]),
      createdAt: faker.date.recent({ refDate: checkInDate }),
    };
  });

  const upcomingBookings = data.slice(half).map(({ userId, hotelId }) => {
    const checkInDate = faker.date.soon();
    const checkOutDate = faker.date.soon({ refDate: checkInDate });
    return {
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      totalPrice: Decimal(faker.commerce.price({ min: 100_000, max: 1_000_000 })),
      status: faker.helpers.arrayElement(["DRAFT", "PENDING", "CONFIRMED"] as BookingStatus[]),
      createdAt: faker.date.recent({ refDate: checkInDate }),
    };
  });

  return prisma.booking.createManyAndReturn({
    data: [...pastBookings, ...upcomingBookings]
  });
}

export { seedBookings };