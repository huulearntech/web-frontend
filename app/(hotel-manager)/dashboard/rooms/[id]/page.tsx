import { notFound } from "next/navigation";
import { getRoomById } from "@/lib/actions/hotel-manager/rooms";

import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = await params;
  const room = await getRoomById(roomId);

  // TODO: Handle this.
  if (!room) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{room.name}</h1>
        <h2 className="text-xl font-semibold">{room.type}</h2>
        <p className="text-sm text-muted-foreground">
          {`Hotel: ${room.hotel?.name ?? "Unknown"} • Created ${room.createdAt.toString()}`}
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
            {/* <div>
              <dt className="text-xs text-muted-foreground">Description</dt>
              <dd className="mt-1 text-sm text-foreground/90">
                {room.description ?? "—"}
              </dd>
            </div> */}
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
          {/* <RoomForm room={roomSerialized} onSubmit={updateRoomAction}/> */}

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