"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { useFilterSheetContext } from "./filter-sheet-context";
import { useMediaQuery } from "usehooks-ts";

// TODO: Fetch the actual number of accommodations from the server
export default function SearchStatusBar() {
  const searchParams = useSearchParams();
  const { setOpen: setFilterSheetOpen } = useFilterSheetContext();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <SearchStatusBarSkeleton />
  }

  return (
    <div className="flex items-center justify-between sticky top-15 md:top-20.5 border-b p-3 -mt-3 z-10 bg-background shadow-md">
      <div className="flex gap-x-4 items-center">
        {!isDesktop &&
          <Button
            onClick={() => setFilterSheetOpen(true)}
            variant='outline'
            className="size-8 flex items-center justify-center"
            aria-label="Open filter sheet"
          >
            <ListFilter className="size-4" />
          </Button>
        }
        <div className="flex flex-col text-sm">
          <span className="font-bold"> Location </span>
          <span> 10000 noi luu tru duoc tim thay </span>
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <div className="flex gap-x-2">
          <Label htmlFor="sort-by-select" className="text-xs font-semibold" >Sort by:</Label>
          <Select defaultValue="price-desc">
            <SelectTrigger id="sort-by-select" className="text-xs font-semibold py-2 px-3 rounded-full">
              <SelectValue placeholder="Sắp xếp theo" />
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
        <Button
          asChild
          className="h-fit bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-full flex items-center gap-x-2"
        >
          <Link
            href={"/search/map?" + searchParams.toString()}
            target="_blank"
          >
            Xem trên bản đồ
            <MapPinnedIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function SearchStatusBarSkeleton() {
  return (
      <div className="flex items-center justify-between sticky top-15 md:top-20.5 border-b p-3 -mt-3 z-10 bg-background shadow-md">
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