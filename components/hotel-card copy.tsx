"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { hotel as hotelIcon } from "@/public/icons/index";
import { SearchResult } from "@/lib/actions/user-search-hotel";

import { MapPin, Heart, Percent } from "lucide-react";
import { PATHS } from "@/lib/constants";

function HotelCard({
  hotel,
  className
}: {
  hotel: SearchResult,
  className?: string
}) {
  const { id, name, imageUrls, rating, ward: { name: wardName }, rooms, 
    // TODO: price, facilities, type(optional),
  } = hotel;

  return (
    <a
      href={`${PATHS.hotels}/${id}`}
      target="_blank"
      rel="noreferrer"
      className={cn("w-full h-102 flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-primary/50 hover:shadow-md", className)}
    >
      <div className="relative h-40 shrink-0 overflow-hidden">
        <Image
          src={imageUrls[0]}
          alt={name}
          className="absolute object-cover w-full h-full"
          // fill
          width={400}
          height={300}
        />
        <div className="absolute top-0 left-0 bg-black/40 text-primary-foreground inline-flex rounded-br-lg items-center px-2 py-1 text-sm font-semibold">
          <MapPin className="size-4 mr-1" />
          {wardName}
        </div>
        <button className="absolute top-0 right-0 px-2 py-1 rounded-bl-lg bg-black/40">
          <Heart className="size-4 text-primary-foreground" />
        </button>
      </div>

      <div className="flex flex-col justify-between px-3 py-2 flex-1">
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-1">
            <h3 role="heading" className="grow font-bold line-clamp-2 overflow-hidden overflow-ellipsis">{name}</h3>
            <div className="flex flex-col items-end">
              <span className="text-xs font-black text-blue-950">9.4</span>
              <span className="text-xs font-semibold">(271)</span>
            </div>

          </div>
          <div className="flex justify-start items-center space-x-2">
            <div className="flex flex-wrap px-1 py-0.5 rounded items-center space-x-1 bg-secondary max-w-1/2">
              <Image src={hotelIcon} alt="" aria-hidden className="" />
              <span className="text-xs font-semibold text-primary">{ /** type */} type goes here</span>
            </div>
            <RatingStars rating={rating || 0} />
          </div>
          <div className='flex items-center space-x-1 ml-1'>
            <MapPin className="size-3" strokeWidth={3} />
            <span className="text-xs font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis flex-1">{wardName}</span>
          </div>

          <div className='flex items-center space-x-2'>
            {rooms[0].facilities.map(facility => (
              <span key={facility.name} className="text-[10px] font-semibold px-1 py-0.75 rounded-lg bg-gray-50 whitespace-nowrap overflow-hidden overflow-ellipsis wrap-break-word">{facility.name}</span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col w-full gap-y-1">
            <div className="max-w-fit flex gap-1 rounded-full py-1 px-1.5 bg-primary text-primary-foreground items-center">
              <Percent className="size-3.5" aria-hidden />
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs">Sale cuoi nam</span>
            </div>
            <div className="text-sm line-through">{rooms[0].price.toString()} VND</div>
            <div className="font-bold text-orange-600">{rooms[0].price.toString()} price goes here VND</div>

            <div className="h-8 relative overflow-hidden">
                <div className="h-8 absolute top-0 animate-slide-updown flex flex-col text-xs text-orange-600 font-medium">
                  Only 1 room(s) left at this price
                </div>
              <div className="h-8 absolute top-full animate-slide-updown flex flex-col text-xs font-medium">
                  Total {rooms[0].price.toString()} VND for 1 room <br/> Exclude taxes and fees
              </div>

            </div>
          </div>
          <button className="font-bold bg-orange-600 text-primary-foreground px-3 py-2 rounded-[0.375rem] text-sm">
            Select
          </button>

        </div>

      </div>
    </a>
  );
};

// NOTE: This cant be styled
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: Math.floor(rating) }).map((_, index) => <Star key={index} />)}
      {rating - Math.floor(rating) >= 0.5 && <HalfStar /> }
    </div>
  )
}

function Star() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" data-id="IcReactionStarFill12">
      <g fill="none">
        <path fill="#ffc629" d="M3.48181495,11.5430154 C3.01970697,11.7914814 2.44367293,11.6182904 2.19520692,11.1561824 C2.09540205,10.9705609 2.06015424,10.7570215 2.09501099,10.5491721 L2.58088786,7.65190901 L0.521517564,5.5988966 C0.149946355,5.22847254 0.149016407,4.62696653 0.519440465,4.25539532 C0.663624686,4.11076458 0.850578093,4.01644739 1.05258287,3.98642726 L3.88066099,3.56614383 L5.14441015,0.947312068 C5.37243489,0.474782844 5.94034608,0.276572791 6.4128753,0.504597525 C6.60623248,0.597904384 6.76228299,0.753954894 6.85558985,0.947312068 L8.11933901,3.56614383 L10.9474171,3.98642726 C11.4663881,4.06355205 11.8245753,4.54678317 11.7474505,5.06575419 C11.7174304,5.26775897 11.6231132,5.45471238 11.4784824,5.5988966 L9.41911214,7.65190901 L9.90498901,10.5491721 C9.99176552,11.0666168 9.64264,11.5564348 9.12519533,11.6432113 C8.91734599,11.6780681 8.70380652,11.6428203 8.51818505,11.5430154 L6,10.1890388 L3.48181495,11.5430154 Z">
        </path>
      </g>
    </svg>
  );
}

function HalfStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" data-id="IcReactionStarHalfLeftFill12">
      <g fill="none">
        <path fill="#ffc629" d="M6.00364736,2.63326096 L6.0007731,8.5875004 C6.12265986,8.58762592 6.24452296,8.61743618 6.35517435,8.67693117 L8.24002015,9.6903742 L7.87573454,7.51815459 C7.83556251,7.27861052 7.91388196,7.03444379 8.08589588,6.86296094 L9.64440899,5.30925941 L7.50616199,4.99149245 C7.26051917,4.95498723 7.04887396,4.79925457 6.94094378,4.57559389 L6.00364736,2.63326096 Z M3.48181495,11.5430154 C3.01970697,11.7914814 2.44367293,11.6182904 2.19520692,11.1561824 C2.09540205,10.9705609 2.06015424,10.7570215 2.09501099,10.5491721 L2.58088786,7.65190901 L0.521517564,5.5988966 C0.149946355,5.22847254 0.149016407,4.62696653 0.519440465,4.25539532 C0.663624686,4.11076458 0.850578093,4.01644739 1.05258287,3.98642726 L3.88066099,3.56614383 L5.14441015,0.947312068 C5.37243489,0.474782844 5.94034608,0.276572791 6.4128753,0.504597525 C6.60623248,0.597904384 6.76228299,0.753954894 6.85558985,0.947312068 L8.11933901,3.56614383 L10.9474171,3.98642726 C11.4663881,4.06355205 11.8245753,4.54678317 11.7474505,5.06575419 C11.7174304,5.26775897 11.6231132,5.45471238 11.4784824,5.5988966 L9.41911214,7.65190901 L9.90498901,10.5491721 C9.99176552,11.0666168 9.64264,11.5564348 9.12519533,11.6432113 C8.91734599,11.6780681 8.70380652,11.6428203 8.51818505,11.5430154 L6,10.1890388 L3.48181495,11.5430154 Z">
        </path>
      </g>
    </svg>
  );
}

export {
  HotelCard,
  RatingStars,
}