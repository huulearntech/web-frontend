"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

import { RoomFormOutput, RoomFormSchema, MultiRoomFormOutput, MultiRoomFormSchema } from "@/lib/zod_schemas/create-room";

export async function deleteRoomAction(id: string) {
  const res = await prisma.room.delete({
    where: { id },
  }).then(() => ({ ok: true, message: null })).catch((err) => ({ ok: false, message: err.message }));
  
  if (!res.ok) {
    throw new Error("Failed to delete room");
  }
  return;
}

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
export async function createRoomAction(formData: RoomFormOutput) {
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

  // TODO: Handle errors + Revalidate rooms page after creation.
  await prisma.room.create({
    data: {
      ...formData,
      hotelId: hotel.id,
    },
  });
}

// TODO: Handle errors properly, do not throw because it makes DX bad.
export async function createManyRoomsAction(formData: MultiRoomFormOutput) {
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

  // TODO: Handle errors + Revalidate rooms page after creation.
  await prisma.room.createMany({
    data: formData.map((room) => ({
      ...room,
      hotelId: hotel.id,
    })),
  });
}


export async function getRoomById(roomId: string) {
  const session = await auth();

  // TODO: handle
  if (session?.user.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }

  return await prisma.room.findUnique({
    where: {
      hotel: { ownerId: session.user.id },
      id: roomId
    },
    include: { hotel: { select: { name: true } } },
  });
}

export async function fetchRoomsForHotelManager() {
  const session = await auth();
  if (session?.user?.role !== "HOTEL_OWNER") {
    throw new Error("Unauthorized");
  }

  return prisma.room.findMany({
    where: { hotel: { ownerId: session.user.id } },
    select: {
      id: true,
      hotelId: true,
      name: true,
      type: true,
      price: true,
      adultCapacity: true,
      childrenCapacity: true,
      imageUrls: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  }).then((rooms) => rooms.map((room) => ({
    ...room,
    price: room.price.toString(),
  })));
}

// TODO: clean up
export type RoomSerialized = Omit<NonNullable<Awaited<ReturnType<typeof fetchRoomsForHotelManager>>[number]>, "price"> & { price: string };