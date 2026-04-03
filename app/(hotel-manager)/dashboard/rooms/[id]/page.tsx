import { notFound } from "next/navigation";
import {
  hotelowner_getRoomById,
  //  hotelowner_updateRoomById
} from "@/lib/actions/hotel-manager/rooms";

import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = await params;
  const room = await hotelowner_getRoomById(roomId);

  // TODO: Handle this.
  if (!room) notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <h2 className="text-xl font-semibold">{room.type}</h2>
        <p className="text-sm text-muted-foreground">
          {`Hotel: ${room.hotel?.name ?? "Unknown"} • Created ${new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(room.createdAt))}`}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-card p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <dl className="grid grid-cols-1 gap-y-2 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Price per night</dt>
              <dd className="font-medium">${room.price.toString()}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Adult capacity</dt>
              <dd className="font-medium">{room.adultCapacity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Children capacity</dt>
              <dd className="font-medium">{room.childrenCapacity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Beds</dt>
              <dd className="font-medium">{room.bedType}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Images</dt>
              <dd className="mt-2">
                {room.imageUrls && room.imageUrls.length > 0 ? (
                  <ul className="flex gap-2 flex-wrap">
                    {room.imageUrls.map((src, i) => (
                      <li key={i} className="w-28 h-20 bg-muted rounded overflow-hidden">
                        {/* TODO next/Image */}
                        <img src={src} alt={`room-${i}`} className="object-cover w-full h-full" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-muted-foreground">No images</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <aside className="bg-card p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium mb-3">Manage Room</h3>
          {/* <RoomForm room={roomSerialized} onSubmit={hotelowner_updateRoomById}/> */}

          <Separator />
          <div className="text-xs text-muted-foreground">
            {/* <p>Room ID: {room.id}</p> */}
            {/* <p>Hotel ID: {room.hotelId}</p> */}
          </div>
        </aside>
      </section>
    </div>
  );
}

// TODO: auth guard
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: roomId } = await params;
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { name: true },
  });
  return {
    title: room?.name ? `Chi tiết phòng - ${room.name}`: "Không tìm thấy phòng",
  };
}