"use client";

import Image from "next/image";

import { cn, formatVND } from "@/lib/utils";
import { HotelCardProps } from "@/lib/types/hotel-card";

import { hotel as hotelIcon } from "@/public/icons/index";
import { MapPin, Heart } from "lucide-react";

export default function HotelCard({
  hotel,
  className,
  href,
  showWardAtTopLeft = true,
}: {
  hotel: HotelCardProps;
  className?: string
  href: string;
  showWardAtTopLeft?: boolean;
}) {
  const {
    id,
    name,
    imageUrls: [thumbUrl],
    reviewPoints,
    numberOfReviews,
    ward: { name: wardName, district: { province: { name: provinceName } } },
    roomTypes: [{ price }],
    facilities,
    type
  } = hotel;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("w-full min-h-106 flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-primary/50 hover:shadow-md", className)}
    >
      <div className="relative h-50 overflow-hidden">
        <Image
          src={thumbUrl}
          alt={name}
          className="absolute object-cover w-100 h-75 inset-0"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {showWardAtTopLeft &&
          <div className="absolute top-0 left-0 bg-black/40 text-primary-foreground inline-flex rounded-br-lg items-center px-2 py-1 text-sm font-semibold">
            <MapPin className="size-4 mr-1" />
            {wardName}
          </div>
        }
        <button
          className="absolute top-1 right-1 p-2 rounded-full bg-black/40 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            console.log("Add to favorites ", id);
          }}
        >
          <Heart className="size-4 text-primary-foreground" />
        </button>
      </div>

      <div className="flex flex-col justify-between px-3 py-2 flex-1">
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-1">
            <h3 role="heading" className="grow font-bold line-clamp-2 overflow-hidden overflow-ellipsis">{name}</h3>
            <div className="flex flex-col items-end">
              <span className="text-xs font-black text-blue-950">{reviewPoints.toFixed(1)}</span>
              <span className="text-xs font-semibold">({numberOfReviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap px-1 py-0.5 rounded items-center gap-x-1 bg-secondary w-fit">
            <Image src={hotelIcon} alt="" aria-hidden className="" />
            <span className="text-xs font-semibold text-primary lowercase first-letter:capitalize">{type}</span>
          </div>

          <div className='flex items-center space-x-1 ml-1'>
            <MapPin className="size-3" strokeWidth={3} />
            <span className="text-xs font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis flex-1">
              {(!showWardAtTopLeft ? (wardName + ", ") : "") + provinceName}
            </span>
          </div>

          <FacilityBadges facilities={facilities.map(f => f.name)} />
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col w-full gap-y-1">
            <div className="text-sm line-through">{formatVND(price)}</div>
            <div className="font-bold text-orange-600">{formatVND(price)}</div>

            <div className="h-8 relative overflow-hidden">
                <div className="h-8 absolute top-0 animate-slide-updown flex flex-col text-xs text-orange-600 font-medium">
                  Chỉ còn 1 phòng với mức giá này!
                </div>
              <div className="h-8 absolute top-full animate-slide-updown flex flex-col text-xs font-medium">
                  Total {formatVND(price)} VND for 1 room <br/> Exclude taxes and fees
              </div>
            </div>
          </div>
          <button className="font-bold bg-orange-600 text-primary-foreground px-3 py-2 rounded-[0.375rem] text-sm">
            Xem
          </button>
        </div>
      </div>
    </a>
  );
};

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

// Resizing window will definitely break this, but it's too overheaded
// for an event listener, because most of the users aren't tester.
function FacilityBadges({ facilities }: { facilities: string[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(facilities.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    const containerWidth = container.clientWidth;
    const children = Array.from(measure.children) as HTMLElement[];

    let usedWidth = 0;
    let count = 0;

    // Measure "+X"
    const more = document.createElement("span");
    more.className = "px-1 text-10 font-semibold";
    more.textContent = "+0";
    measure.appendChild(more);

    const moreWidth = more.getBoundingClientRect().width;
    measure.removeChild(more);

    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const width = el.getBoundingClientRect().width;
      const gap = i > 0 ? 6 : 0;

      const remaining = children.length - (i + 1);

      const totalNeeded =
        remaining > 0
          ? usedWidth + width + gap + moreWidth + 6
          : usedWidth + width + gap;

      if (totalNeeded > containerWidth) break;

      usedWidth += width + gap;
      count++;
    }

    setVisibleCount(count);
  }, [facilities.length]);

  return (
    <Tooltip>
      {/** Hiển thị */}
      <div ref={containerRef} aria-hidden className="flex items-center space-x-2 overflow-clip">
        {facilities.slice(0, visibleCount).map((facility) => (
          <span key={facility} className="shrink-0 text-[10px] font-semibold px-1 py-0.75 rounded-lg bg-gray-50">
            {facility}
          </span>
        ))}

        {visibleCount < facilities.length && (
          <TooltipTrigger className="shrink-0">
            <span className="shrink-0 text-[10px] font-semibold px-1 py-0.75 rounded-lg bg-gray-50">
              +{facilities.length - visibleCount}
            </span>
          </TooltipTrigger>
        )}
      </div>

      {/** Ẩn, tận dụng cho screen reader luôn */}
      <div ref={measureRef} className="absolute invisible sr-only h-0 overflow-hidden whitespace-nowrap">
        {facilities.map((facility, i) => (
          <span key={i} className="shrink-0 text-[10px] font-semibold px-1 py-0.75 rounded-lg bg-gray-50">
            {facility}
          </span>
        ))}
      </div>

      <TooltipContent aria-hidden className="flex flex-col gap-y-2">
        <span className="text-sm font-semibold mb-1 block">Cơ sở lưu trú này có các tiện ích:</span>
        <ul className="flex flex-col space-y-1">
          {facilities.map(facility => ( // Should have indexed by id
            <li key={facility} className="text-sm font-medium">
              <span> {facility} </span>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
}