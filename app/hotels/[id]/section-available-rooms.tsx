import { UserRound, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { fake_hotels } from "@/old/mock_data";
import { percentage } from "@/public/icons";
import Link from "next/link";


export default function AvailableRoomsSection() {
  return (
    <section id="available-rooms" className="w-full flex flex-col scroll-mt-30">
      <div className="rounded-[1.25rem] px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <h2 className="font-bold text-[1.25rem]">Những phòng còn trống tại bla bla</h2>
        <RoomCard />
        <RoomCard />
      </div>
    </section>
  )
};

function RoomCard () {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-7xl bg-white rounded-lg p-4 shadow-md overflow-hidden"
      style={{
        backgroundImage: "url(https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg?tr=h-420,q-75,w-467)",
        backgroundRepeat: "no-repeat",
        objectFit: "cover"
      }}
    >
      {/* <Image src={"https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg?tr=h-420,q-75,w-467"} alt="" width={467} height={420} className="absolute object-cover -z-10"/> */}

      <h2 className="text-[1.25rem] font-bold line-clamp-2">Bla bla bla room name</h2>
      <div className="flex w-full space-x-4">
        <div className="flex flex-col w-full max-w-[296px] space-y-2">
          <Image
            src={fake_hotels[0].imageSrcs[0]}
            alt=""
            width={296}
            height={222}
            className="w-[296px] h-[222px] rounded-[1rem] object-cover"
          />
          <div className="flex flex-col space-y-3 p-2">
            <div className="flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcHotelRoomMeasure"><path d="M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15" stroke="#0194F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6" stroke="#03121A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
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
                  <p>Superior Double Room With City View - Room Only</p>
                  <p>Không gồm bữa sáng</p>
                  <p>Superior Double Room With City View - Room Only</p>
                  <p>Superior Double Room With City View - Room Only</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex space-x-2">
                      <UserRound className="size-4" />
                      <span>x2</span>
                    </div>
                    <div className="flex space-x-2">
                      <UserRound className="size-4" />
                      <span>x1</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col w-full gap-y-1 items-end justify-center">
                    <div className="max-w-fit flex gap-1 rounded-full p-1 bg-primary">
                      <Image src={percentage} alt="" aria-hidden />
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-primary-foreground mr-1">Sale cuoi nam</span>
                    </div>
                    <div className="text-xs line-through">123.456 VND</div>
                    <div className="font-bold text-base text-orange-600">123456 VND</div>
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
                    <Link
                      href={"/booking/1"} // Example booking id
                      target="_blank"
                      className="bg-primary text-white text-sm font-bold px-3 py-2 rounded-[0.375rem]"
                    >
                      Chọn
                    </Link>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-inherit data-[state=selected]:bg-inherit [&>td]:border-r [&>td]:last:border-r-0 [&>td]:p-3">
                <TableCell>
                  <p>Superior Double Room With City View - Room Only</p>
                  <p>Không gồm bữa sáng</p>
                  <p>Superior Double Room With City View - Room Only</p>
                  <p>Superior Double Room With City View - Room Only</p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <UserRound className="size-4" />
                    x2
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col w-full gap-y-1 items-end justify-center">
                    <div className="max-w-fit flex gap-1 rounded-full p-1 bg-primary">
                      <Image src={percentage} alt="" aria-hidden />
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-primary-foreground mr-1">Sale cuoi nam</span>
                    </div>
                    <div className="text-xs line-through">123.456 VND</div>
                    <div className="font-bold text-base text-orange-600">123456 VND</div>
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
                    <Link
                      href={"/booking/1"} // Example booking id
                      target="_blank"
                      className="bg-primary text-white text-sm font-bold px-3 py-2 rounded-[0.375rem]"
                    >
                      Chọn
                    </Link>
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
