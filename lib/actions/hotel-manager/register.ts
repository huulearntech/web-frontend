"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getProvinces() {
  return prisma.province.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

export async function getDistrictsByProvinceId(provinceId: string) {
  return prisma.district.findMany({
    where: { provinceId },
    select: {
      id: true,
      name: true,
    },
  });
};

export async function getWardsByDistrictId(districtId: string) {
  return prisma.ward.findMany({
    where: { districtId },
    select: {
      id: true,
      name: true,
    },
  });
};

export async function registerHotel(data: {
}) {
  const session = await auth();

  // FIXME: PENDING_HOTEL_OWNER
  if (session?.user.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }
};