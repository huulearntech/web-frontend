"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { HeartIcon } from "@heroicons/react/24/outline";
import { Star, MapPin, StarHalf, Heart } from "lucide-react";

import { hotel as hotel_icon } from "@/public/icons";
import { HotelCardProps } from "@/old/mock_data";

// function HotelCard({
//   hotel,
//   isFavorite,
// }: {
//   hotel: HotelCardProps,
//   isFavorite: boolean,
// }) {
//   const { id, name, imageSrcs, location, price,
//           rating, type, amenities, numberOfReviews } = hotel;

//   return (
//     <div className="h-60 w-full bg-white rounded-xl shadow-lg hover:shadow-primary/20 flex border-2">
//       {/* images */}
//       <div className="w-2/6 relative">
//         <Carousel className="h-full">
//           {
//             imageSrcs.map((src, index) => (
//               <CarouselItem key={index} className="h-full relative">
//                 <Image
//                   src={src}
//                   alt=""
//                   fill
//                   className="object-cover"
//                 />
//               </CarouselItem>
//             ))
//           }
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>

//         <Tooltip>
//           <TooltipTrigger
//             asChild
//             className="absolute top-2 right-2"
//           >
//             <Button onClick={() => console.log("toggle favorite")} className="size-8 rounded-full">
//               <HeartIcon />
//               {/** TODO: Toggle: What if one or many user(s) click this constantly?
//                * => Can't read and write on every click!!
//                * Should cache or something else.
//                * onClick => {
//                *   setLoading(true)
//                *   await server request.
//                *   toast (sucess || error)
//                * }
//                */}
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p> {isFavorite ? "Them vao muc yeu thich" : "Da them vao muc yeu thich"} </p>
//           </TooltipContent>
//         </Tooltip>

//       </div>
//       {/* end images */}

//       {/* details */}
//       <div className="flex w-4/6 p-4 divide-x-2 divide-gray-200">
//         <div className="w-3/4 pr-2">
//           <h2 className="text-base font-semibold line-clamp-2">{name}</h2>
//           <div className="flex flex-col space-y-1">
//             <div>
//               <RatingStars rating={rating} />
//               <span className="ml-2 text-sm text-gray-700">{"(" + numberOfReviews + " đánh giá)"}</span>
//             </div>
//             <div className="text-blue-500 bg-blue-50 inline-flex items-center w-fit p-1 rounded">
//               <Image src={hotel_icon} alt="Hotel Icon" className="mr-2" />
//               <span className="text-xs font-semibold">{type}</span>
//             </div>

//             <div className="text-gray-700 inline-flex items-center">
//               <MapPin />
//               <span className="ml-2">{location}</span>
//             </div>
//             <div className="flex flex-wrap space-x-2 mt-1">
//               {amenities.slice(0, 3).map((amenity, index) => (
//                 <span key={index} className="bg-gray-200 text-gray-700 font-semibold text-xs px-2 py-1 rounded">
//                   {amenity}
//                 </span>
//               ))}
//               {amenities.length > 3 && (
//                 <Tooltip>
//                   <TooltipTrigger asChild >
//                     <span className="bg-gray-200 text-gray-700 font-semibold text-xs px-2 py-1 rounded">
//                       +{amenities.length - 3}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <div className="p-2">
//                       <p className="mb-2">Cơ sở lưu trú này có:</p>
//                       <ul className="list-disc grid grid-cols-2 gap-1 pl-3">
//                         {amenities.map((amenity, index) => (
//                           <li key={index}>{amenity}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </TooltipContent>
//                 </Tooltip>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* end details */}

//         {/* price and button */}
//         <div className="flex flex-col items-end justify-end w-1/4">
//           <span className="text-gray-500 text-sm">Giá từ</span>
//           <span className="font-semibold text-lg text-orange-600 mb-2">VND {price}</span>
//           <Button asChild>
//             <Link
//               href={`/hotels/${id}`}
//               target="_blank"
//             >
//               Xem
//             </Link>
//           </Button>
//         </div>
//         {/* end price and button */}
//       </div>
//     </div>
//   );
// };

function HotelCardSimple({
  hotel
}: {
  hotel: HotelCardProps
}) {
  const { id, name, imageSrcs, location,
          price, rating, type, } = hotel;

  return (
    <div className="relative w-full max-w-60 rounded-lg shadow-md overflow-hidden">
      <div className="absolute top-0 left-0 bg-primary text-primary-foreground inline-flex rounded-br-lg items-center px-2 py-1 text-sm">
        <MapPin className="size-4 mr-1"/>
        { location }
      </div>
      <button className="absolute top-0 right-0 px-2 py-1 rounded-bl-lg bg-secondary">
        <Heart className="size-4 text-primary"/>
      </button>
      <Link href={`/hotels/${id}`} target="_blank" >
        <Carousel>
          <CarouselContent>
            {imageSrcs.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={name}
                  className="object-cover" width={240} height={100}
                  unoptimized
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex flex-col space-y-1 mt-3 mb-1 px-2">
          <h4 className="font-bold line-clamp-2 text-sm text-gray-700">{name}</h4>
          <RatingStars rating={rating} />
          <div className='flex items-center text-blue-500 text-sm space-x-2'>
            {/* <AccommodationIcon /> */}
            <span>{type}</span>
          </div>

          <div className='flex items-center text-gray-700 text-sm space-x-2'>
            {/* <LocationIcon /> */}
            <span>{location}</span>
          </div>
          <span className="font-bold text-orange-600 mt-auto text-sm">{price} VND</span>
        </div>
      </Link>
    </div>
  );
};


function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="inline-flex">
      {Array.from({ length: Math.floor(rating) }).map((_, index) =>
        <Star key={index} className="size-3 fill-yellow-500 text-yellow-500"/>
      )}
      {rating - Math.floor(rating) >= 0.5 &&
        <StarHalf className="size-3 fill-yellow-500 text-yellow-500"/>
      }
    </div>
  )
}

export {
  // HotelCard,
  HotelCardSimple,
  RatingStars,
}