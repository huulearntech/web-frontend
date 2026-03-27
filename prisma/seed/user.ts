import { UserRole } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";

import { faker } from "@faker-js/faker";

async function seedRegularUsers(count = 10) {
  const users = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRole.USER,
    profileImageUrl: faker.image.avatar(),
  })) satisfies NonNullable<Parameters<typeof prisma.user.createMany>[0]>["data"];

  return await prisma.user.createManyAndReturn({
    data: users,
    skipDuplicates: true, // In case you run the seeding multiple times
  });
}

async function seedHotelOwners(count = 5) {
  const users = Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: UserRole.HOTEL_OWNER,
  }));

  return await prisma.user.createManyAndReturn({
    data: users,
    skipDuplicates: true, // In case you run the seeding multiple times
  });
}

export { seedHotelOwners, seedRegularUsers};