import { BedType, Hotel, HotelType } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

import { faker } from "@faker-js/faker";

// if Hotel model has a field of Unsupported (geolocation), so Prisma does not allow to use create

async function seedHotels(data: { wardId: string, ownerId: string }[]) {
  if (data.length === 0) {
    console.warn("No data provided for seeding hotels.");
    return [];
  }

  const hotels = data.map(({ wardId, ownerId }) => {
    // ----------------- AI generated. BE CAUTIOUS!!! --------------
    // generate check-in/check-out times as "HH:MM" strings (time of day only)
    const toTimeString = (minutesTotal: number) =>
      `${String(Math.floor(minutesTotal / 60)).padStart(2, "0")}:${String(minutesTotal % 60).padStart(2, "0")}`;

    // check-in between 06:00 and 20:00
    const checkInMinutes = faker.number.int({ min: 6 * 60, max: 20 * 60 });
    // check-out at least 1 hour after check-in, up to 12 hours later, capped at 23:59
    const checkOutMinutes = Math.min(checkInMinutes + faker.number.int({ min: 60, max: 12 * 60 }), 23 * 60 + 59);

    const checkInTime = toTimeString(checkInMinutes);
    const checkOutTime = toTimeString(checkOutMinutes);
    //-----------------------------------------------------

    return {
      name: faker.company.name() + " Hotel",
      description: faker.lorem.paragraph(),
      ownerId,
      wardId,
      checkInTime,
      checkOutTime,
      breakfastAvailability: faker.datatype.boolean(),
      imageUrls: faker.helpers.uniqueArray(() => faker.image.url({ width: 400, height: 300 }), 8),
      longitude: faker.location.longitude(),
      latitude: faker.location.latitude(),
      type: faker.helpers.arrayElement(Object.values(HotelType)),
      reviewPoints: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      numberOfReviews: faker.number.int({ min: 0, max: 1000 }),
    } satisfies NonNullable<Parameters<typeof prisma.hotel.create>[0]["data"]>;
  }) ;

  return await prisma.hotel.createManyAndReturn({
    data: hotels,
  });
}
async function seedRooms(hotels: Hotel[]) {
  if (hotels.length === 0) {
    console.warn("No hotels provided for seeding rooms.");
    return { count: 0 };
  }

  const rooms: {
    hotelId: string;
    name: string;
    type: string;
    imageUrls: string[];
    price: number;
    areaM2: number;
    adultCapacity: number;
    childrenCapacity: number;
    bedType: BedType;
  }[] = [];

  for (const hotel of hotels) {
    // create a few rooms per hotel
    const roomCount = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < roomCount; i++) {
      rooms.push({
        hotelId: hotel.id,
        name: `${hotel.name} Room ${String(i + 1).padStart(3, "0")}`,
        type: faker.helpers.arrayElement(["SINGLE", "DOUBLE", "SUITE"]),
        imageUrls: faker.helpers.uniqueArray(() => faker.image.url({ width: 400, height: 300 }), 1),
        price: parseFloat(faker.commerce.price({ min: 100, max: 500 })),
        areaM2: faker.number.int({ min: 20, max: 100 }),
        adultCapacity: faker.number.int({ min: 1, max: 4 }),
        childrenCapacity: faker.number.int({ min: 0, max: 4 }),
        bedType: faker.helpers.arrayElement(Object.values(BedType)),
      });
    }
  }

  // createMany returns a BatchPayload with { count }
  const result = await prisma.room.createMany({
    data: rooms,
    skipDuplicates: true,
  });

  return result;
}

const facilities: { name: string, iconUrl: string }[] = [
  { name: "Free Wi-Fi", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833833458-7b6ab67bc5df6ef9f2caee150aae1f43.png" },
  { name: "Swimming Pool", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833772013-929572dff57d1755878aa79dc46e6be5.png" },
  { name: "Restaurant", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833794378-eb51eee62d46110b712e327108299ea6.png" },
  { name: "24-hour Front Desk", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301381776-c014a3111a6de5236d903c93b7647e4c.png" },
  { name: "Elevator", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833714411-48c9b7565018d02dc32837738df1c917.png" },
  { name: "Air Conditioning", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301285653-0a04df7d3f807b32484ceec10d9681c6.png" },
  { name: "Parking", iconUrl: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833756238-56e24fb64a964d38b8f393bf093a77a9.png" },
];

async function seedFacilities() {
  const result = await prisma.facility.createManyAndReturn({
    data: facilities,
    skipDuplicates: true,
  });

  return result;
}

async function seedConnectionHotelsOnFacilities(hotels: Hotel[]) {
  await Promise.all(hotels.map(async (hotel) => {
     await prisma.hotel.update({
      where: { id: hotel.id },
      data: {
        facilities: {
          connectOrCreate: faker.helpers.uniqueArray(() => {
            const facility = faker.helpers.arrayElement(facilities);
            return {
              where: { name: facility.name },
              create: facility,
            }
           }, facilities.length),
         },
       },
     });
  }));
}

export { seedHotels, seedRooms, seedFacilities, seedConnectionHotelsOnFacilities };