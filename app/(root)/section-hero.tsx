import Image from "next/image"
import SearchBar from "@/components/search-bar"
import { hero_image } from "@/public/images"

export default function HeroSection() {
  return (
    <section className="w-full h-screen lg:h-auto lg:mt-6">
      <Image
        src={hero_image}
        alt=""
        aria-hidden
        className="object-cover h-screen lg:h-auto lg:object-none lg:rounded-[20px] lg:mx-auto"
      />

      <div className="absolute top-[calc(50%+2.5rem)] left-1/2 -translate-1/2 lg:top-0 lg:left-0 lg:translate-0 lg:relative lg:-mt-[120px] content flex flex-col items-center">
        <div className="min-h-[120px] relative bg-black/50 text-white w-full gap-y-1 pt-4 pb-7 px-4 -mb-7 rounded-t-[20px]">
          <h1 className="text-[26px] font-semibold">
            Điểm đến tiếp theo của bạn? Đặt khách sạn giá tốt với Hoteloka
          </h1>
          <h2>
            Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế nữa
          </h2>
        </div>
        <div className="relative w-full bg-white rounded-[20px] p-6 border">
          <SearchBar className="w-full" />
        </div>
      </div>
    </section>
  )
};