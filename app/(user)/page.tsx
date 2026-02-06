import Image from "next/image";
import type { PopularDestination } from "@/lib/definitions";
import { coupons } from "@/old/mock_data";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

import { fake_hotels, fake_locations } from "@/old/mock_data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HotelCard } from "@/components/hotel-card";
import Coupon from "@/components/coupon";

import { Calendar, ClockFading, Star, UserCheck } from "lucide-react"
import { app_store, play_store } from "@/public/logos"

import {
  bg_dalat,
  bg_danang,
  bg_halong,
  bg_hanoi,
  bg_hochiminh,
  bg_hoian,
  bg_hue,
  bg_nhatrang,
  bg_phanthiet,
  bg_phuquoc,
  bg_quynhon,
  bg_vungtau,
} from "@/public/images";

import HeroSection from "./section-hero";
import PartnersSection2 from "./section-partner";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-12 -mt-20 lg:mt-0 mb-6">
      <HeroSection />
      <WhyUsSection />
      <Feed />
      <CouponSection />
      <PartnersSection2 />
      <PopularDestinationsSection />
    </main>
  );
};

/*async*/ function Feed () { // This should be modifiable by admin
  // const hotels = await fetchHotels(); // Placeholder
  const hotels = fake_hotels;
  const locations = fake_locations;
  const title = "Di choi cuoi tuan gan nha"
  return (
    <section className="flex flex-col content">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Tabs defaultValue={locations[0].name}
       className="content"
       >
        <div className="overflow-x-auto justify-start">
          <TabsList
          className="bg-inherit gap-x-2"
          >
            {locations.map((location) => (
              <TabsTrigger value={location.name} key={location.name}
              className={
                // Check this on dark mode
                "h-9 text-sm font-bold px-3 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 bg-accent text-foreground dark:text-muted-foreground data-[state=active]:shadow-sm"
              }
              >
                {location.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {locations.map((location) => (
          <TabsContent value={location.name} key={location.name}>
            <Carousel opts={{ align: "start" }}
            >
              <CarouselContent className="p-2">
                {hotels.concat(hotels).map((hotel, index) => (
                  <CarouselItem
                    key={hotel.id + index}
                    className="basis-1/2 md:basis-1/3 xl:basis-1/4"
                  >
                    <HotelCard hotel={hotel} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/** Not sure if this is ok */}
              <CarouselNext className="max-lg:hidden"/>
              <CarouselPrevious className="max-lg:hidden"/>
            </Carousel>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function PopularDestinationsSection () {
  return (
    <section className="flex flex-col gap-y-6 content">
      <h2 className="text-[26px] font-bold"> Ưu đãi khách sạn tốt nhất tại các điểm đến phổ biến </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {most_popular_destinations.map((dest, index) => (
            <div key={index} className="group relative rounded-[10px] overflow-hidden transition-all flex flex-col hover:cursor-pointer">
              <Image
                key={index}
                src={dest.backgroundImage}
                alt=""
                className="rounded-md object-cover -z-10 h-40 w-full"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 duration-300"></div>
              <div className="absolute top-0 left-0 right-0 p-4 text-white">
                <h3 className="lg:text-[20px] font-semibold whitespace-pre-wrap wrap-break-word">{dest.regionName}</h3>
              </div>
              <div className="absolute bottom-0 group-hover:bottom-8 opacity-0 group-hover:opacity-100 duration-300
             text-white border border-white rounded-[10px] px-4 py-2 text-xs text-center font-semibold left-1/2 -translate-x-1/2">
                Xem thêm chỗ nghỉ
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUsSection() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-4 content">
        <div className="lg:w-1/4 gap-y-2">
          <div className="box-border wrap-break-word whitespace-pre-wrap text-center lg:text-start font-semibold text-[26px]">
            50M+ lượt tải xuống, 1M+ đánh giá
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

        <div className="flex lg:w-1/3 p-4 gap-x-3 border rounded-[10px]">
          <Calendar className="size-6 mt-2" />
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="font-semibold">Hủy miễn phí</h3>
            <p>Hủy hoặc nhận hoàn tiền bất cứ khi nào bạn cần thay đổi kế hoạch.</p>
          </div>

        </div>
        <div className="flex lg:w-1/3 p-4 gap-x-3 border rounded-[10px]">
          <UserCheck className="size-6 mt-2" />
          <div className="flex flex-col flex-1 gap-y-1">
            <h3 className="font-semibold">Nhiều phương thức thanh toán an toàn</h3>
            <p>Nhiều lựa chọn thanh toán toàn cầu đáng tin cậy dành cho bạn.</p>
          </div>

        </div>
        <div className="flex lg:w-1/3 p-4 gap-x-3 border rounded-[10px]">
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

function CouponSection () {
  return (
    <section className="content flex flex-col">
      <h2 className="text-[26px] font-bold"> Mã giảm cho bạn </h2>
      <p> Chỉ áp dụng trên App! </p>
      <div>
        <Tabs defaultValue={Object.keys(coupons)[0]} className="content">
          <div className="overflow-x-auto justify-start">
            <TabsList
            className="bg-inherit gap-x-2"
            >
              {Object.keys(coupons).map((coupon_type) => (
                <TabsTrigger value={coupon_type} key={coupon_type}
              className={
                // Check this on dark mode
                "h-9 text-sm font-bold px-3 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 bg-accent text-foreground dark:text-muted-foreground data-[state=active]:shadow-sm"
              }
                >
                  {coupon_type}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(coupons).map(([coupon_type, coupons_of_type]) => (
            <TabsContent value={coupon_type} key={coupon_type}>
              <Carousel
                opts={{
                  align: "start"
                }}
              >
                <CarouselContent className="p-2">
                  {coupons_of_type.map((coupon, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/4">
                      <Coupon coupon={coupon} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext />
                <CarouselPrevious />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
};

const most_popular_destinations: PopularDestination[] = [
  {
    regionName: "Da Nang",
    numberOfHotels: 763,
    backgroundImage: bg_danang,
  },
  {
    regionName: "Nha Trang",
    numberOfHotels: 569,
    backgroundImage: bg_nhatrang,
  },
  {
    regionName: "Phu Quoc",
    numberOfHotels: 381,
    backgroundImage: bg_phuquoc,
  },
  {
    regionName: "Vung Tau",
    numberOfHotels: 339,
    backgroundImage: bg_vungtau,
  },
  {
    regionName: "Ha Noi",
    numberOfHotels: 1049,
    backgroundImage: bg_hanoi,
  },
  {
    regionName: "Da Lat",
    numberOfHotels: 591,
    backgroundImage: bg_dalat,
  },
  {
    regionName: "Hoi An",
    numberOfHotels: 553,
    backgroundImage: bg_hoian,
  },
  {
    regionName: "Phan Thiet",
    numberOfHotels: 243,
    backgroundImage: bg_phanthiet,
  },
  {
    regionName: "Quy Nhon",
    numberOfHotels: 80,
    backgroundImage: bg_quynhon,
  },
  {
    regionName: "Hue",
    numberOfHotels: 243,
    backgroundImage: bg_hue,
  },
  {
    regionName: "Ho Chi Minh",
    numberOfHotels: 1527,
    backgroundImage: bg_hochiminh,
  },
  {
    regionName: "Ha Long",
    numberOfHotels: 230,
    backgroundImage: bg_halong,
  },
];