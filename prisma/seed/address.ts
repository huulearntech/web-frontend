// TODO: use fakerVI for more authentic Vietnamese names
// import { fakerVI as faker } from "@faker-js/faker";

// But we not support search in Vietnamese yet, so use this
import { faker } from "@faker-js/faker";

import prisma from "@/lib/prisma";
import { Country, District, Province } from "@/lib/generated/prisma/client";

// Seed Vietnam as the only country for simplicity
async function seedCountryVietnam() {
  return await prisma.country.upsert({
    where: { name: "Vietnam" },
    update: {}, // No updates needed, we just want to ensure it exists
    create: {
      name: "Vietnam",
    },
  });
}

async function seedProvinces(country: Country, count = 5) {
  const provinces = Array.from({ length: count }, () => ({
    countryId: country.id,
    name: faker.location.state(),
  }));
  return await prisma.province.createManyAndReturn({
    data: provinces,
    skipDuplicates: true, // In case you run the seeding multiple times
  });
}

async function seedDistricts(provinces: Province[]) {
  if (provinces.length === 0) {
    // throw new Error("No provinces found. Please seed provinces before districts.");
    console.warn("No provinces found. Skipping district seeding.");
    return [];
  }

  const districtNames = faker.helpers.uniqueArray(faker.location.county, provinces.length * 5);

  const districts = provinces.flatMap((province) =>
    Array.from({ length: 5 }, () => ({
      provinceId: province.id,
      name: districtNames.pop() || faker.location.county(),
    }))
  )

  return await prisma.district.createManyAndReturn({
    data: districts,
    skipDuplicates: true, // In case you run the seeding multiple times
  });
}

async function seedWards(districts: District[]) {
  if (districts.length === 0) {
    // throw new Error("No districts found. Please seed districts before wards.");
    console.warn("No districts found. Skipping ward seeding.");
    return [];
  }

  const wardNames = faker.helpers.uniqueArray(faker.location.city, districts.length * 5);


  const wards = districts.flatMap((district) =>
    Array.from({ length: 5 }, () => ({
      districtId: district.id,
      name: wardNames.pop() || faker.location.city(),
    }))
  );

  return await prisma.ward.createManyAndReturn({
    data: wards,
    skipDuplicates: true, // In case you run the seeding multiple times
  });
}


export { seedCountryVietnam, seedProvinces, seedDistricts, seedWards };