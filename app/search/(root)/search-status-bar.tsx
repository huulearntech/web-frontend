"use client";

import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { MapPinnedIcon, ListFilter } from "lucide-react";
import { useFilterSheetSetOpen } from "../filter-sheet-context";
import { PATHS } from "@/lib/constants";

// TODO: pass the search params via props may be better
export default function SearchStatusBar({ location, total }: { location: string; total: number }) {
  const searchParams = useSearchParams();
  const setFilterSheetOpen = useFilterSheetSetOpen();

  return (
    <div className="flex items-center justify-between sticky top-21.5 lg:top-20.5 border-b p-3 -mt-3 z-10 bg-background shadow-md">
      <div className="flex gap-x-4 items-center">
        <Button
          onClick={() => setFilterSheetOpen(true)}
          variant='outline'
          className="size-8 flex lg:hidden items-center justify-center"
          aria-label="Open filter sheet"
        >
          <ListFilter className="size-4" />
        </Button>
        <div className="flex flex-col text-sm">
          <span className="font-bold"> {location} </span>
          <span> {total} nơi lưu trú được tìm thấy </span>
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <div className="flex gap-x-2">
          <Label htmlFor="sort-by-select" className="text-xs font-semibold" >Sắp xếp theo:</Label>
          <Select defaultValue="price-desc">
            <SelectTrigger id="sort-by-select" className="text-xs font-semibold py-2 px-3 rounded-full">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="price-desc">Giá cao nhất</SelectItem>
                <SelectItem value="price-asc">Giá thấp nhất </SelectItem>
                <SelectItem value="rating">Điểm đánh giá cao nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button
          asChild
          className="h-fit bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-full flex items-center gap-x-2"
        >
          <a href={`${PATHS.searchMap}?${searchParams.toString()}`} target="_blank" >
            Xem trên bản đồ
            <MapPinnedIcon className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function SearchStatusBarSkeleton() {
  return (
    <div className="flex items-center justify-between sticky top-21.5 border-b p-3 -mt-3 z-10 bg-background shadow-md">
      <div className="flex flex-col text-sm gap-2">
        <Skeleton className="w-24 h-4 rounded-md" />
        <Skeleton className="w-40 h-3 rounded-md" />
      </div>
      <div className="flex gap-x-4">
        <div className="flex gap-x-2 items-center">
          <Skeleton className="w-40 h-8 rounded-full" />
        </div>
        <Skeleton className="w-40 h-8 rounded-full" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  );
}