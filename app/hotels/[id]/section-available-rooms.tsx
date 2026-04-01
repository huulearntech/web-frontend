import Image from "next/image";

import {
  ExternalLink,
  RulerDimensionLineIcon,
  BedDoubleIcon,
  DoorOpenIcon,
  UserIcon,
  MilkOffIcon,
  Milk
} from "lucide-react";

import { PATHS } from "@/lib/constants";
import { fetchHotel } from "@/lib/actions/hotel";

export default async function AvailableRoomsSection({
  hotel
}: {
  hotel: NonNullable<Awaited<ReturnType<typeof fetchHotel>>>
}) {
  const { rooms } = hotel;
  return (
    <section id="available_rooms" className="w-full flex flex-col">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Những phòng còn trống tại {hotel.name}</h2>
        {rooms.length === 0 && (
          <div className="w-full h-48 flex items-center justify-center bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Không có phòng nào còn trống cho khoảng thời gian này</span>
          </div>
        )}
        {rooms.length > 0 && rooms.map((room) => (
          <RoomCard key={room.id} room={room} breakfastAvailability={hotel.breakfastAvailability} />
        ))}
      </div>
    </section>
  )
};

// There should be more arguments to this.
// E.g.: number of rooms,...
function RoomCard({
  room,
  breakfastAvailability
}: {
  room: NonNullable<Awaited<ReturnType<typeof fetchHotel>>>["rooms"][number];
  breakfastAvailability: boolean
}) {
  return (
    <div
      className="flex flex-col md:flex-row lg:flex-row bg-white rounded-xl p-4 shadow-md overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-room-card.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        backgroundSize: "220px"
      }}
    >
      {/* Image column */}
      <div className="w-full md:w-2/5 lg:w-1/3 shrink-0">
        <Image
          src={room.imageUrls.length > 0 ? room.imageUrls[0] : "/images/default-room.jpg"}
          alt={room.type}
          width={496}
          height={372}
          className="w-full h-64 lg:h-full rounded-lg object-cover"
          loading="lazy"
        />
      </div>

      {/* Details column */}
      <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col justify-between gap-y-4 mt-4 md:mt-0 md:ml-4 lg:ml-6">
        <header className="flex items-start justify-between gap-x-4">
          <div className="min-w-0">
            <h2 className="text-lg lg:text-xl font-bold line-clamp-2">
              {room.type}
            </h2>
          </div>

          <div className="flex items-center gap-x-2 text-sm text-primary font-bold">
            <ExternalLink className="size-4 shrink-0" aria-hidden />
            <span>Xem chi tiết phòng</span>
          </div>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
          <div className="flex items-center gap-x-2 text-sm">
            <RulerDimensionLineIcon className="size-4" />
            <span>{room.areaM2} m²</span>
          </div>

          <div className="flex items-center gap-x-2 text-sm">
            <DoorOpenIcon className="size-4" />
            <span>1 phòng</span>
          </div>

          {room.adultCapacity > 0 && (
            <div className="flex items-center gap-x-2 text-sm">
              <UserIcon className="size-4" />
              <span>{room.adultCapacity} người lớn</span>
            </div>
          )}

          {room.childrenCapacity > 0 && (
            <div className="flex items-center gap-x-2 text-sm">
              <UserIcon className="size-4" />
              <span>{room.childrenCapacity} trẻ em</span>
            </div>
          )}

          <div className="flex items-center gap-x-2 text-sm">
            {breakfastAvailability ? (
              <>
                <Milk className="size-4 shrink-0" />
                <span>Bao gồm bữa sáng</span>
              </>
            ) : (
              <>
                <MilkOffIcon className="size-4 shrink-0" />
                <span>Không bao gồm bữa sáng</span>
              </>
            )}
          </div>

        </section>

        <section className="mt-3">
          <h3 className="text-sm font-semibold mb-2">Tiện nghi</h3>
          <ul className="flex flex-wrap gap-2">
            <li className="flex items-center gap-x-2 text-sm">
              <BedDoubleIcon className="size-4" />
              <span className="lowercase first-letter:capitalize">Giường {room.bedType}</span>
            </li>
            {room.facilities.map((facility) => (
              <li
                key={facility.id}
                className="flex items-center gap-x-2 text-sm"
              >
                {facility.iconUrl ? (
                  <Image
                    src={facility.iconUrl}
                    alt={facility.name}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                ) : null}
                <span>{facility.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-4 flex items-center justify-between">
          <div className="text-base lg:text-lg font-extrabold text-orange-600">
            {room.price.toLocaleString()} VND
          </div>

          <div>
            <a
              href={PATHS.bookings + "/1"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white text-sm font-bold px-4 py-2 rounded-md"
              aria-label={`Đặt phòng ${room.type}`}
            >
              Chọn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}