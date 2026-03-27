import prisma from "@/lib/prisma";

import { seedCountryVietnam, seedProvinces, seedDistricts, seedWards } from "./address";
import { seedHotelOwners, seedRegularUsers } from "./user";
import { seedConnectionHotelsOnFacilities, seedFacilities, seedHotels, seedRooms } from "./hotel";
import { seedBookings } from "./booking";

import { faker } from "@faker-js/faker";

async function main() {
  if (process.env.NODE_ENV !== "development") {
    console.warn("Seeding is only allowed in development environment.");
    return;
  }

  console.log("Seeding database...");

  const Vietnam = await seedCountryVietnam();
  const provinces = await seedProvinces(Vietnam, 5);
  const districts = await seedDistricts(provinces);
  const wards = await seedWards(districts);
  
  const hotelOwners = await seedHotelOwners(10);

  const shuffledWards = faker.helpers.shuffle(wards);
  const hotelData = hotelOwners.map((owner, idx) => ({
    wardId: shuffledWards[idx % shuffledWards.length].id,
    ownerId: owner.id,
  }));

  await seedFacilities();

  const hotels = await seedHotels(hotelData);
  await seedRooms(hotels);
  const users = await seedRegularUsers(10);
  const bookingData = users.flatMap((user) =>
    hotels.map((hotel) => ({
      userId: user.id,
      hotelId: hotel.id,
    }))
  );

  await seedConnectionHotelsOnFacilities(hotels);
  await seedBookings(bookingData);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });