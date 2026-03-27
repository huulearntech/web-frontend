import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

import { ChevronRight, MapPin } from 'lucide-react';
import { tvlk_favicon } from "@/public/logos";

import { ImagePresentation } from "@/components/image-presentation";
import OverviewImagePresentation from "./overview-image-presentation";

import { fetchHotel } from "@/lib/actions/hotel";

const mock_nearby_locations = [
  {
    name: "Bãi biển Mỹ Khê",
    address: "Đường Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng",
    distance: "0.5 km",
  },
  {
    name: "Cầu Rồng",
    address: "Đường Nguyễn Văn Linh, An Hải Tây, Sơn Trà, Đà Nẵng",
    distance: "2 km",
  },
  {
    name: "Bảo tàng Chăm",
    address: "2 Đường 2 Tháng 9, Bình Hiên, Hải Châu, Đà Nẵng",
    distance: "3 km",
  },
];


export default async function OverviewSection({
  hotel
}: {
  hotel: Awaited<ReturnType<typeof fetchHotel>>
}) {

  if (!hotel) return null;

  const province = hotel.ward.district.province;
  const district = hotel.ward.district;
  const ward = hotel.ward;

  const facilities = hotel.facilities;
  const rooms = hotel.rooms;
  return (
    <ImagePresentation
      imageSources={hotel.imageUrls}
      title={hotel.name}
      description={hotel.description}
    >
      <section id="overview" className="w-full flex flex-col scroll-mt-24 md:scroll-mt-30">
        <Breadcrumb className="py-1 mb-3">
          {/** TODO: real link to regions */}
          <BreadcrumbList className="text-xs font-semibold">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{province.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{district.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{ward.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{hotel.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <OverviewImagePresentation imageUrls={hotel.imageUrls} />

        <div className="rounded-4xl px-4 py-5 flex flex-col gap-y-5 shadow-xl">
          <div className="flex space-x-10">
            <div className="flex-1 gap-y-2">
              <h1 className="text-[1.5rem] font-bold">{hotel.name}</h1>
              <div className="flex gap-x-2 items-center">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-50 text-primary lowercase first-letter:capitalize">{hotel.type}</span>
              </div>
            </div>

            <div className="flex gap-x-2 py-2">
              <div className="flex flex-col text-end">
                <span className="text-xs">Gia/phong/dem</span>
                <span className="text-[1.25rem] font-bold text-orange-600">{Math.min(...rooms.map(room => room.price.toNumber()))} VND</span>
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
                    <div className="text-[1.625rem] font-bold">{hotel.reviewPoints}</div>
                    <div className="text-sm font-semibold"> /10 </div>
                  </div>
                </div>

                <div className="flex flex-col font-bold">
                  <span>Rất tốt</span>
                  <a href="#review" className="text-sm text-primary flex gap-x-1">
                    {hotel.numberOfReviews} đánh giá
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
                {mock_nearby_locations.map((loc, index) => (
                  <div key={index} className="flex items-start gap-x-2">
                    <MapPin className="size-4 text-gray-500 mt-1" />
                    <div>
                      <div className="flex items-center gap-x-2">
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-gray-500">{loc.distance}</div>
                      </div>
                      <div className="text-gray-500">{loc.address}</div>
                    </div>
                  </div>
                ))}
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
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-x-2">
                    <Image
                      src={facility.iconUrl || ""}
                      alt=""
                      className="size-4"
                      width={16}
                      height={16}
                    />
                    {facility.name}
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="bg-white border border-gray-200 rounded-[0.625rem] p-3 flex-1 flex-col space-y-3">
            <p className="text-sm max-h-20 overflow-hidden overflow-ellipsis">{hotel.description}</p>
            <div className="flex space-x-1 text-sm font-bold text-primary">
              Xem thêm
              <ChevronRight className="size-5" />
            </div>
          </div>
        </div>
      </section>
    </ImagePresentation>
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