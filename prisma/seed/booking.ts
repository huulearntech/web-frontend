import { BookingStatus } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

import { faker } from "@faker-js/faker";


async function seedBookings(data: {userId: string, hotelId: string}[] = []) {
  const bookings = data.map(({ userId, hotelId }) => {
    const endDate = faker.date.recent();
    const startDate = faker.date.recent({ refDate: endDate });
    return ({
        userId,
        hotelId,
        startDate: startDate,
        endDate: endDate,
        totalPrice: parseFloat(faker.commerce.price({ min: 100, max: 1000 })),
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
    })
  });

  return await prisma.booking.createMany({
    data: bookings,
  });
}

export { seedBookings };