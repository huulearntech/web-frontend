"use server";

import prisma from "@/lib/prisma";
import { getLocationsOrHotelsByString } from "../generated/prisma/sql";

export async function user_getLocationOrHotelByQueryString(query: string, similarity: number = 0.2) {
  return prisma.$queryRawTyped(getLocationsOrHotelsByString(query, similarity));
}