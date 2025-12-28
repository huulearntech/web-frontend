import { User, } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { fake_hotels } from "@/old/mock_data";


export default function AvailableRoomsSection() {
  return (
    <section 
    id="available-rooms"
    className="w-full flex flex-col"
    >
      <h2>Những phòng còn trống tại bla bla</h2>

      <div className="rounded-[1.25rem] px-4 py-5 flex flex-col gap-y-5 shadow-xl">
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

			<h2 className="text-lg font-semibold line-clamp-2">Bla bla bla room name</h2>
			<div className="flex w-full space-x-4">
				<div className="flex flex-col w-[296px]">
          <Image
            src={fake_hotels[0].imageSrcs[0]}
            alt=""
            width={296}
            height={222}
            className="w-[296px] h-[222px] rounded-[1rem] object-cover"
          />
					<div className="inline-flex my-4">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcHotelRoomMeasure"><path d="M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15" stroke="#0194F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6" stroke="#03121A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
						<span className="ml-2">100 m²</span>
					</div>
					<ul className="grid grid-cols-2 gap-2">
						{Array.from({length: 5}).map((_, index) => (
							<li key={index} className="flex items-center">
								<span>bla amenity {index}</span>
							</li>
						))}
					</ul>
				</div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Lựa chọn phòng </TableHead>
              <TableHead> Khách </TableHead>
              <TableHead> Giá/phòng/đêm </TableHead>
              <TableHead> Phòng </TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                <p>Superior Double Room With City View - Room Only</p>
                <p>Không gồm bữa sáng</p>
                <p>Superior Double Room With City View - Room Only</p>
                <p>Superior Double Room With City View - Room Only</p>
              </TableCell>
              <TableCell>
                <User />
                <User />
              </TableCell>
              <TableCell>
                123456 VND
              </TableCell>
              <TableCell> x1 </TableCell>
              <TableCell> 
                <button>Chọn</button>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
			</div>
		</div>
  )
}