import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { prisma } from "@/lib/prisma";
import TableWrapper from "./tmp-table-wrapper";

type RoomFromServer = {
  id: string;
  name: string | null;
  slug?: string | null;
  type?: string | null;
  price?: number | null;
  capacity?: number | null;
  isAvailable?: boolean | null;
  createdAt: string;
};

export default async function RoomsPage() {
  // Fetch rooms from Prisma (adjust include fields to your schema)
  // const rooms = await prisma.room.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     slug: true,
  //     type: true,
  //     price: true,
  //     capacity: true,
  //     isAvailable: true,
  //     createdAt: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  //   take: 100,
  // });

  // Mock data for demonstration (remove when using real DB)
  const rooms: RoomFromServer[] = [
    {
      id: "1",
      name: "Deluxe Suite",
      slug: "deluxe-suite",
      type: "Suite",
      price: 250,
      capacity: 4,
      isAvailable: true,
      createdAt: new Date("2023-10-01T10:00:00Z").toISOString(),
    },
    {
      id: "2",
      name: "Standard Room",
      slug: "standard-room",
      type: "Standard",
      price: 100,
      capacity: 2,
      isAvailable: false,
      createdAt: new Date("2023-09-15T12:30:00Z").toISOString(),
    },
  ];


  // Serialize dates for client components
  const safeRooms: RoomFromServer[] = rooms.map((r) => ({
    ...r,
    createdAt: r.createdAt.toString(),
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

      <TableWrapper rooms={safeRooms} />
    </div>
  );
}