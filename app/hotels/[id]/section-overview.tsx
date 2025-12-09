import { RatingStars } from "@/components/hotel-card";
import Image from "next/image";


export default async function OverviewSection () {
  // const hotel = await getHotelById();
  return (
    <section>
      <div>
      Breadcrumb

      </div>
      <div className="rounded-t-[10px] overflow-hidden flex gap-x-2 mx-3">
        <Image src={""} alt="" width={480} height={320}/>
        <div className="grid grid-cols-3 gap-2">
          {
            /** 6 images */
          }
        </div>
      </div>
      <div className="rounded-[20px] px-4 py-5 gap-y-5">
        <div className="flex">
          <div className="grow">
            <h1 className="text-2xl font-bold">Hotel name</h1>
            <div className="flex gap-x-2">
              <span className="px-2 py-1 rounded-full text-xs">Khach san</span>
              <RatingStars rating={5} />
            </div>
          </div>

          <div className="flex">
            <div className="text-end">
              <span className="text-xs">Gia/phong/dem</span>
              <span className="text-[20px] font-bold">123456 VND</span>
            </div>
            <a href="#available-rooms">Chon phong</a>
          </div>
        </div>

        <div className="flex">
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>

        </div>

        <div>
          Introduction

        </div>
      </div>
    </section>
  )
}