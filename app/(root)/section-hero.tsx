import Image from "next/image"
import SearchBar from "@/components/search-bar"
import { Calendar, ClockFading, Star, UserCheck } from "lucide-react"
import { app_store, play_store } from "@/public/logos"
import { hero_image } from "@/public/images"

export default function HeroSection() {
  return (
    <section className="w-full h-screen lg:h-fit flex flex-col items-center gap-y-12" >
      <div className="flex flex-col">
        <Image
          src={hero_image}
          alt=""
          className="object-cover lg:object-none lg:rounded-[20px]"
        />

        <div className="relative -mt-[120px] mx-auto w-full max-w-6xl flex flex-col items-center">
          <div className="min-h-[120px] relative bg-black/50 text-white w-full gap-y-1 pt-4 pb-7 px-4 -mb-7 rounded-t-[20px]">
            <h1 className="text-[26px] font-semibold">
              Điểm đến tiếp theo của bạn? Đặt khách sạn giá tốt với Hoteloka
            </h1>
            <h2>
              Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế nữa
            </h2>
          </div>
          <div className="relative w-full bg-white rounded-[20px] p-6 border">
            <SearchBar className="w-full"/>
          </div>
        </div>
      </div>

      {/** TODO(huutp): let the children elements grow all the cross-axis of parent container
         *  (although the default is that but seems not??)
         */}
      <div className="flex flex-col lg:flex-row max-w-6xl gap-4">
        <div className="lg:w-60 gap-y-2">
          <div className="box-border wrap-break-word whitespace-pre-wrap text-center lg:text-start font-semibold text-[26px]">
            50M+ Luot tai xuong, 1M+ danh gia
          </div>
          <div className="h-6 flex justify-center lg:justify-start gap-x-6">
            <div className="flex">
              <Image
                src={app_store}
                alt="App Store"
                className="mr-2 h-6"
              />
              <div className="inline-flex items-center font-semibold">
                4.6
                <Star className="size-3 fill-current ml-1" />
              </div>
            </div>
            <div className="flex">
              <Image
                src={play_store}
                alt="Play Store"
                className="mr-2 h-6"
              />
              <div className="inline-flex items-center font-semibold">
                4.7
                <Star className="size-3 fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-1 h-fit lg:h-full p-4 gap-x-3 border rounded-[10px]">
          <Calendar className="size-6 mt-2" />
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="font-semibold">Hủy miễn phí</h3>
            <p>Hủy hoặc nhận hoàn tiền bất cứ khi nào bạn cần thay đổi kế hoạch.</p>
          </div>

        </div>
        <div className="flex lg:flex-1 h-fit lg:h-full p-4 gap-x-3 border rounded-[10px]">
          <UserCheck className="size-6 mt-2" />
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="font-semibold">Nhiều phương thức thanh toán an toàn</h3>
            <p>Nhiều lựa chọn thanh toán toàn cầu đáng tin cậy dành cho bạn.</p>
          </div>

        </div>
        <div className="flex lg:flex-1 h-fit lg:h-full p-4 gap-x-3 border rounded-[10px]">
          <ClockFading className="size-6 mt-2" />
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="font-semibold">Trung tâm hỗ trợ 24/7</h3>
            <p>Bạn có thể liên hệ với chúng tôi bất cứ lúc nào cần hỗ trợ.</p>
          </div>
        </div>
      </div>
    </section>
  )
};