import Image from "next/image";
// import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserRound, ExternalLink, RulerDimensionLineIcon, TicketPercentIcon } from "lucide-react";

import { fake_hotels } from "@/old/mock_data";

// Provide a lightweight default so component can still be used without props
const defaultRoom: RoomCardProps = {
  id: "room-default",
  hotelId: "hotel-default",
  type: "Superior Double Room With City View - Room Only",
  adultCapacity: 2,
  childrenCapacity: 0,
  price: 123456,
  imageUrls: fake_hotels[0]?.imageSrcs ?? ["/images/default-room.jpg"],
};

type RoomCardProps = {
  id: string;
  hotelId: string;
  type: string;
  adultCapacity: number;
  childrenCapacity: number;
  // price stored as Decimal in Prisma; expose as number|string for UI
  price: number | string;
  imageUrls: string[];
}

export default function AvailableRoomsSection() {
  return (
    <section id="available-rooms" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Những phòng còn trống tại bla bla</h2>
        <RoomCard room={defaultRoom}/>
        <RoomCard room={defaultRoom}/>
      </div>
    </section>
  )
};

function RoomCard({ room }: { room: RoomCardProps }) {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-7xl bg-white rounded-lg p-4 shadow-md overflow-hidden"
      style={{
        backgroundImage: "url('/images/bg-room-card.svg')",
        backgroundRepeat: "no-repeat",
        objectFit: "cover"
      }}
    >
      <h2 className="text-[1.25rem] font-bold line-clamp-2">{room.type}</h2>
      <div className="flex w-full space-x-4">
        <div className="flex flex-col w-full max-w-74 space-y-2">
          <Image
            src={room.imageUrls[0]}
            alt={room.type}
            width={296}
            height={222}
            className="w-full h-auto rounded-3xl object-cover"
          />
          <div className="flex flex-col space-y-3 p-2">
            <div className="flex items-center space-x-2">
              <RulerDimensionLineIcon className="size-4" />
              <span className="text-sm">100 m²</span>
            </div>

            <ul className="grid grid-cols-2 gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span>bla amenity {index}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-1 text-sm text-primary font-bold">
              <ExternalLink className="size-4" />
              <span>
                See room details
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-fit bg-white border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-inherit data-[state=selected]:bg-inherit rounded-t-[0.375rem] [&>th]:border-r [&>th]:px-3 [&>th]:py-2 [&>th]:last:border-r-0">
                <TableHead className="text-sm font-bold"> Lựa chọn phòng </TableHead>
                <TableHead className="text-sm font-bold"> Khách </TableHead>
                <TableHead className="text-sm font-bold"> Giá/phòng/đêm </TableHead>
                <TableHead className="text-sm font-bold"> Phòng </TableHead>
                <TableHead> </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="hover:bg-inherit data-[state=selected]:bg-inherit [&>td]:border-r [&>td]:last:border-r-0 [&>td]:p-3">
                <TableCell>
                  <p>{room.type}</p>
                  <p>Không gồm bữa sáng</p>
                  <p>{room.type}</p>
                  <p>{room.type}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex space-x-2">
                      <UserRound className="size-4" />
                      <span>x{room.adultCapacity}</span>
                    </div>
                    <div className="flex space-x-2">
                      <UserRound className="size-4" />
                      <span>x{room.childrenCapacity}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col w-full gap-y-1 items-end justify-center">
                    <div className="max-w-fit flex gap-1 rounded-full p-1 bg-primary">
                      <TicketPercentIcon className="size-4" aria-hidden />
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-primary-foreground mr-1">Sale cuoi nam</span>
                    </div>
                    <div className="text-xs line-through">123.456 VND</div>
                    <div className="font-bold text-base text-orange-600">{room.price} VND</div>
                    <div className="h-8 flex flex-col text-xs font-medium">
                      Exclude taxes and fees
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    x1
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <a
                      href={"/booking/1"} // Example booking id
                      target="_blank"
                      rel="noreferrer"
                      className="bg-primary text-white text-sm font-bold px-3 py-2 rounded-[0.375rem]"
                    >
                      Chọn
                    </a>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-inherit data-[state=selected]:bg-inherit [&>td]:border-r [&>td]:last:border-r-0 [&>td]:p-3">
                <TableCell>
                  <p>{room.type}</p>
                  <p>Không gồm bữa sáng</p>
                  <p>{room.type}</p>
                  <p>{room.type}</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <UserRound className="size-4" />
                    x{room.adultCapacity}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col w-full gap-y-1 items-end justify-center">
                    <div className="max-w-fit flex gap-1 rounded-full p-1 bg-primary">
                      <TicketPercentIcon className="size-4" aria-hidden />
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-primary-foreground mr-1">Sale cuoi nam</span>
                    </div>
                    <div className="text-xs line-through">123.456 VND</div>
                    <div className="font-bold text-base text-orange-600">{room.price} VND</div>
                    <div className="h-8 flex flex-col text-xs font-medium">
                      Exclude taxes and fees
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    x1
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <a
                      href={"/booking/1"} // Example booking id
                      target="_blank"
                      rel="noreferrer"
                      className="bg-primary text-white text-sm font-bold px-3 py-2 rounded-[0.375rem]"
                    >
                      Chọn
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}