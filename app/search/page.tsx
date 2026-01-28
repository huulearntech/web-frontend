import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import Filter from "./filter";
import Results from "./results";

import type { SearchPageProps } from "@/lib/definitions";

import bgShowOnMap from "@/public/images/bg-show-on-map.svg";
import mapPinShowOnMap from "@/public/images/map-pin-show-on-map.png"

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default async function SearchPage( props: { 
  searchParams: Promise<SearchPageProps>
  // searchParams?: Promise<SearchPageProps>
}) {
  const searchParams = await props.searchParams;
  const { spec, childSpec } = searchParams;
  console.log(spec, childSpec);
  // TODO: Handle invalid spec
  if (!spec) notFound();
  const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  // const childAges = childSpec?.split('.'); // age of every child

  return (
    <>
      <aside className="w-[250px] flex flex-col space-y-3">
        <div className="w-[250px] h-[125px] relative rounded-[10px] overflow-hidden">
          <Image src={bgShowOnMap} alt="" aria-hidden
            fill
            className="bg-cover"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-y-2">
            <Image src={mapPinShowOnMap} alt="" aria-hidden className="w-9" />
            <Link
              href={"#"}
              target="_blank"
              className="bg-primary text-primary-foreground text-sm font-bold px-3 py-2 rounded-full whitespace-nowrap overflow-hidden overflow-ellipsis"
            >
              Xem trên bản đồ
            </Link>
          </div>
        </div>
        <Filter />
      </aside>

      <div className="w-full flex flex-col space-y-3">
        <div className="flex justify-between sticky top-15 md:top-20.5 border-b p-3 -mt-3 z-10 bg-background shadow-md">
          <div className="flex flex-col text-sm">
            <span className="font-bold"> {location} </span>
            <span> {/**  number of results found*/} 10000 noi luu tru duoc tim thay </span>
          </div>
          <div className="flex space-x-2">

          <Label htmlFor="sort-by-select" className="text-xs font-semibold" >Sort by:</Label>
            <Select defaultValue="price-desc">
              <SelectTrigger id="sort-by-select" className="text-xs font-semibold py-2 px-3 rounded-full">
                <SelectValue placeholder="Sắp xếp theo"/>
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="price-desc">Giá cao nhất</SelectItem>
                  <SelectItem value="price-asc">Giá thấp nhất </SelectItem>
                  <SelectItem value="rating">Điểm đánh giá</SelectItem>
                  <SelectItem value="popularity">Độ phổ biến</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Suspense fallback={<div>loading</div>}>
          <Results /**searchParams={searchParams}*/ />
        </Suspense>
      </div>
    </>
  )
}