import { RatingStars } from "@/components/hotel-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

import { fake_hotels } from "@/old/mock_data";

import { ChevronRight, MapPin } from 'lucide-react';
import { tvlk_favicon } from "@/public/logos";
import * as icons from "@/public/icons";

import ImageCarouselDialog from "@/components/image-carousel-dialog";


export default async function OverviewSection () {
  // const hotel = await getHotelById();
  return (
    <section id="overview" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
      <Breadcrumb className="py-1 mb-3">
        <BreadcrumbList className="text-xs font-semibold">
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Vietnam</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Danang</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Blablabla</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ImageCarouselDialog imageSources={fake_hotels[0].imageSrcs} />
      {/** Change this to another layout on non-large screen */}
      <figure className="rounded-t-[10px] overflow-hidden grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-2 mx-3 h-auto lg:h-83">
        <Image
          src={fake_hotels[0].imageSrcs[0]}
          alt=""
          width={480}
          height={332}
          className="object-cover w-full h-full lg:row-span-2 lg:col-span-1"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-2 h-full w-full lg:col-span-2 lg:row-span-2">
          {
            fake_hotels[0].imageSrcs.concat(fake_hotels[0].imageSrcs).slice(1, 7).map((src, index) => (
              <Image
                key={index}
                src={src}
                alt=""
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            ))
          }
        </div>
      </figure>

      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <div className="flex space-x-10">
          <div className="flex-1 gap-y-2">
            <h1 className="text-[1.5rem] font-bold">Hotel name</h1>
            <div className="flex gap-x-2 items-center">
              <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-primary">Khach san</span>
              <RatingStars rating={5} width={16} height={16} />
            </div>
          </div>

          <div className="flex gap-x-2 py-2">
            <div className="flex flex-col text-end">
              <span className="text-xs">Gia/phong/dem</span>
              <span className="text-[1.25rem] font-bold text-orange-600">123456 VND</span>
            </div>
            <a href="#available-rooms" className="font-bold text-white flex items-center bg-orange-600 px-3 py-2 rounded-[0.375rem]">Chon phong</a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="bg-white border border-gray-200 rounded-[0.625rem] p-3 flex-1 flex-col space-y-3">
            <div className="flex gap-x-2">
              <div className="flex items-center p-1">
                <Image src={tvlk_favicon} alt="" className="mr-2" />
                <div className="flex items-end text-primary">
                  <div className="text-[1.625rem] font-bold">{9.5}</div>
                  <div className="text-sm font-semibold"> /10 </div>
                </div>
              </div>

              <div className="flex flex-col font-bold">
                <span>Rất tốt</span>
                <a href="#review" className="text-sm text-primary flex gap-x-1">
                  {10} đánh giá
                  <ChevronRight className="size-5" />
                </a>
              </div>
            </div>
            <h2 className="font-semibold">Khách nói gì về kỳ nghỉ của họ</h2>
            { /*
            review_tags.map((tag, index) => (
              <Tag key={index} color="green" className="mr-1">
                {tag}
              </Tag>
            ))
            */
            }
            <div className="flex flex-col overflow-y-auto max-h-32 space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-[0.625rem] p-2 flex flex-col space-y-2">
                  <div className="flex justify-between items-center gap-y-2 font-bold">
                    <span className="text-sm">bla bla {index}</span>
                    <div className="bg-blue-50 px-1 py-0.5 rounded-[0.375rem] inline-flex gap-x-0.5 items-center text-primary text-xs">
                      <Image src={tvlk_favicon} alt="" className="size-3" />
                      10 / 10
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3 overflow-hidden overflow-ellipsis">this hotels good this hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels goodthis hotels good{index}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1" >
            <div className="flex items-center justify-between mb-2 font-bold" >
              <h2>Trong khu vực</h2>
              <a href="#location" className="text-sm text-primary flex gap-x-1">
                Xem bản đồ
                <ChevronRight className="size-5" />
              </a>
            </div>
            <div className="flex flex-col gap-y-2 text-sm">
              <p className="flex items-center gap-x-1">
                <MapPin className="size-3" />
                bla bla address
              </p>
              <p className="flex items-center gap-x-1">
                <MapPin className="size-3" />
                foo foo address
              </p>
              <p className="flex items-center gap-x-1">
                <MapPin className="size-3" />
                baz baz address
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1">
            <div className="flex items-center justify-between mb-2 font-bold">
              {/* TODO(huutp): Add real amenities list */}
              <h2>Tiện ích chính</h2>
              <a href="#facilities" className="text-sm text-primary flex gap-x-1">
                Xem thêm
                <ChevronRight className="size-5" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="inline-flex items-center">
                <Image src={icons.air_conditioner} alt="" className="size-6 mr-2" />
                <span>Máy lạnh</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.parking} alt="" className="size-6 mr-2" />
                <span>Chỗ đậu xe</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.knife_fork} alt="" className="size-6 mr-2" />
                <span>Nhà hàng</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.elevator} alt="" className="size-6 mr-2" />
                <span>Thang máy</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.pool} alt="" className="size-6 mr-2" />
                <span>Hồ bơi</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.wifi} alt="" className="size-6 mr-2" />
                <span>Wifi</span>
              </div>
              <div className="inline-flex items-center">
                <Image src={icons.receptionist_24h} alt="" className="size-6 mr-2" />
                <span>Tiếp tân 24h</span>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white border border-gray-200 rounded-[0.625rem] p-3 flex-1 flex-col space-y-3">
          <p className="text-sm max-h-20 overflow-hidden overflow-ellipsis">Diamond Beach Hotel toạ lạc tại khu vực / thành phố An Hải Bắc. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý khách từ thủ tục nhận phòng đến trả phòng hay bất kỳ yêu cầu nào. Nếu cần giúp đỡ xin hãy liên hệ đội ngũ tiếp tân, chúng tôi luôn sẵn sàng hỗ trợ quý khách. Sóng WiFi phủ khắp các khu vực chung của khách sạn cho phép quý khách luôn kết nối với gia đình và bè bạn.</p>
          <div className="flex space-x-1 text-sm font-bold text-primary">
            Xem thêm
            <ChevronRight className="size-5" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function OverviewSectionSkeleton () {
  return (
    <section id="overview" className="w-full flex flex-col scroll-mt-30">
      <Skeleton className="w-1/3 h-4 mb-3" />

      <figure className="rounded-t-[10px] overflow-hidden flex flex-col lg:flex-row gap-2 mx-3 h-auto lg:h-83">
        <Skeleton className="object-cover w-120 h-full" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 h-83 w-full">
          {
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative ">
                <Skeleton
                  className="object-cover w-full h-full"
                />
              </div>
            ))
          }
        </div>
      </figure>

      <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
        <div className="flex space-x-10">
          <div className="flex-1 gap-y-2">
            <Skeleton className="w-2/3 h-6 mb-2" />
            <div className="flex gap-x-2 items-center">
              <Skeleton className="w-12 h-5 rounded-full" />
              <Skeleton className="w-20 h-5" />
            </div>
          </div>

          <div className="flex gap-x-2 py-2">
            <div className="flex flex-col text-end">
              <Skeleton className="w-16 h-4 mb-1" />
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-24 h-10 rounded-[0.375rem]" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Skeleton className="rounded-lg p-4 flex-1 h-48" />
          <Skeleton className="rounded-lg p-4 flex-1 h-48" />
          <Skeleton className="rounded-lg p-4 flex-1 h-48" />
        </div>
      </div>
    </section>
  )
}