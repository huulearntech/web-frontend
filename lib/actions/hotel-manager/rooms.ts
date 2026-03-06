"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";
import { Prisma } from "@/lib/generated/prisma/client";

export async function deleteRoomAction(id: string) {
  const res = await prisma.room.delete({
    where: { id },
  }).then(() => ({ ok: true, message: null })).catch((err) => ({ ok: false, message: err.message }));
  
  if (!res.ok) {
    throw new Error("Failed to delete room");
  }
  return;
}

const RoomFormSchema = z.object({
  type: z.string(),
  adultCapacity: z.coerce.number().int(),
  childrenCapacity: z.coerce.number().int(),
  price: z.coerce.number().transform(value => new Prisma.Decimal(value)),
  imageUrls: z.url().array(),
})

export async function updateRoomAction(id: string, data: any) {
  const parsedData = RoomFormSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Validation errors:", z.treeifyError(parsedData.error));
    throw new Error("Invalid form data");
  }
  
  const res = await prisma.room.update({
    where: { id },
    data: parsedData.data,
  });
  
  return res;
}

// TODO: Handle errors properly, do not throw because it makes DX bad.
export async function createRoomAction(formData: any) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const hotel = await prisma.hotel.findUnique({
    where: { ownerId: session.user.id },
    select: { id: true },
  });
  if (!hotel) {
    throw new Error("Hotel not found for the current user");
  }

  const parsedData = RoomFormSchema.safeParse(formData);
  if (!parsedData.success) {
    console.error("Validation errors:", z.treeifyError(parsedData.error));
    throw new Error("Invalid form data");
  }

  await prisma.room.create({
    data: {
      ...parsedData.data,
      hotelId: hotel.id,
    },
  });
}