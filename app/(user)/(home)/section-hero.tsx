import Image from "next/image"
// TODO: clean up the search bar
import { SearchBar__NonCollapsible } from "@/components/search-bar"
import { hero_image } from "@/public/images"
import beach from "@/public/images/beach.webp"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100svh-5rem)] lg:h-auto">
      <div className="relative h-full w-full overflow-hidden lg:max-w-[min(95%,var(--container-7xl))] mx-auto lg:h-75 lg:rounded-4xl">
        <Image
          src={hero_image}
          alt=""
          aria-hidden
          fill
          className="absolute inset-0 object-cover hidden lg:block"
        />

        <Image
          src={beach}
          alt=""
          aria-hidden
          fill
          className="absolute inset-0 object-cover lg:hidden"
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-1/2 lg:top-0 lg:left-0 lg:translate-0 lg:relative lg:-mt-30 content flex flex-col items-center max-w-9/10 xl:max-w-6xl">
        <div className="min-h-30 relative bg-black/50 w-full gap-y-1 py-4 px-4 rounded-4xl lg:pb-0 lg:rounded-b-none lg:mb-20">
          <h1 className="text-[26px] font-semibold text-white">
            Điểm đến tiếp theo của bạn? Đặt khách sạn giá tốt với Hoteloka
          </h1> <h2 className="text-white">
            Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế nữa
          </h2>
          {/* <SearchBarImpl isDesktop className="w-full bg-white text-primary placeholder:text-secondary p-6 rounded-4xl border mt-4 lg:absolute lg:inset-x-0" /> */}
          <SearchBar__NonCollapsible className="bg-white text-primary placeholder:text-secondary p-6 rounded-4xl border mt-4 lg:absolute lg:inset-x-0" />
        </div>
      </div>
    </section>
  )
};