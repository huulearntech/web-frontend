import Link from "next/link";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

import RoomTable from "./room-table";

import type { Room } from "@/lib/generated/prisma/client";
type RoomSerialized = Omit<Room, "price"> & { price: string };

export default async function RoomsPage() {
  const session = await auth();
  if (!session || !session.user) { return null; }

  const userId = session.user.id;
  const hotelId = await prisma.hotel.findUnique({
    where: { ownerId: userId },
    select: { id: true },
  }).then((hotel) => hotel?.id);
  if (!hotelId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Hotel Not Found</h1>
        <p className="text-sm text-muted-foreground">
          No hotel found for your account. Please contact support.
        </p>
      </div>
    );
  }

  // Fetch rooms from Prisma (adjust include fields to your schema)
  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      hotelId: true,
      type: true,
      price: true,
      adultCapacity: true,
      childrenCapacity: true,
      imageUrls: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
    where: {
      hotel: {
        ownerId: userId,
      },
    },
  });

  const roomsSerialized: RoomSerialized[] = rooms.map((room) => ({
    ...room,
    price: room.price.toString(),
  }));

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rooms</h1>
          <p className="text-sm text-muted-foreground">
            Manage rooms for your hotel — view, edit or remove rooms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/rooms/new">
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add room
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent>
          <RoomTable rooms={roomsSerialized}/>
        </CardContent>
      </Card>
    </div>
  );
}