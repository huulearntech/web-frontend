import Image from "next/image"
import { SearchBarImpl } from "@/components/search-bar"
import { hero_image } from "@/public/images"

export default function HeroSection() {
  return (
    <section className="relative w-full h-120 lg:h-auto">
      <Image
        src={hero_image}
        alt=""
        aria-hidden
        className="object-cover h-full lg:h-auto lg:object-none lg:rounded-4xl lg:mx-auto lg:max-w-[95%]"
      />

      <div className="absolute top-1/2 left-1/2 -translate-1/2 lg:top-0 lg:left-0 lg:translate-0 lg:relative lg:-mt-30 content flex flex-col items-center max-w-9/10 xl:max-w-6xl">
        <div className="min-h-30 relative bg-black/50 w-full gap-y-1 py-4 px-4 lg:pb-0 rounded-4xl lg:rounded-b-none lg:mb-16">
          <h1 className="text-[26px] font-semibold text-white">
            Điểm đến tiếp theo của bạn? Đặt khách sạn giá tốt với Hoteloka
          </h1> <h2 className="text-white">
            Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế nữa
          </h2>
          {/** Styling is a bit off */}
          <SearchBarImpl className="w-full bg-white text-primary placeholder:text-secondary p-6 rounded-4xl border lg:absolute lg:inset-x-0" />
        </div>
      </div>
    </section>
  )
};