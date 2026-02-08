import { HotelCard } from "@/components/hotel-card";
import type { HotelCardProps } from "@/old/mock_data";
import type { SearchPageProps } from "@/lib/definitions"

import { fake_hotels } from "@/old/mock_data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Results( props: { 
  searchParams?: Promise<SearchPageProps>
}) {
  // const searchParams = await props.searchParams;
  // if (!searchParams || !searchParams.spec) notFound();
  // const { spec, childSpec } = searchParams;

  // const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  // const childAges = childSpec?.split('.'); // age of each child

  /**
   * Server-side data fetching
   */
  // simulate server delay and fetch the fake hotels
  const results: HotelCardProps[] = await new Promise<HotelCardProps[]>(resolve => {
    setTimeout(() => {
      resolve(fake_hotels.concat(fake_hotels).concat(fake_hotels));
    }, 5000);
  });
  const currentPage = 9;
  const totalPages = 10;

  // TODO: Handle no results found
  if (results.length === 0) {
    return <p>No hotels found matching your criteria.</p>;
  }

  return (
    <>
      <ul className="w-full grid grid-cols-3 gap-4">
        {results.map((hotel, index) => (
          <li key={index}>
            <HotelCard hotel={hotel} />
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#"/>
          </PaginationItem>
          {
            totalPages <= 5 ?
              (
                Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink href="#">{index + 1}</PaginationLink>
                  </PaginationItem>
                ))
              ) : (
                <>
                  {
                    currentPage > 1 &&
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    currentPage >= 4 &&
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  }
                  {
                    currentPage >= 3 &&
                    <PaginationItem>
                      <PaginationLink href="#">{currentPage - 1}</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    <PaginationItem>
                      <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    currentPage <= totalPages - 2 &&
                    <PaginationItem>
                      <PaginationLink href="#">{currentPage + 1}</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    currentPage <= totalPages - 3 &&
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  }
                  {
                    currentPage < totalPages &&
                    <PaginationItem>
                      <PaginationLink href="#">{totalPages}</PaginationLink>
                    </PaginationItem>
                  }
                </>
              )
          }
          <PaginationItem>
            <PaginationNext href="#"/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
};

export function ResultsSkeleton() {
  return (
    <ul className="w-full grid grid-cols-3 gap-4">
      {Array.from({length: 12}).map((_, index) => (
        <li key={index}>
          <div className="w-full h-100 rounded-lg overflow-hidden flex flex-col justify-between gap-y-2">
            <Skeleton className="w-full h-50" />
            <div className="flex justify-between px-3 py-2 flex-1 gap-x-2">
              <div className="w-full flex flex-col gap-y-2">
                <Skeleton className="w-full h-4 rounded-lg" />
                <Skeleton className="w-full h-4 rounded-lg" />
                <Skeleton className="w-3/5 h-3 rounded-lg" />
              </div>
              <Skeleton className="size-10 rounded-sm" />
            </div>

            <div className="flex justify-between items-end px-3 py-2 flex-1 gap-x-2">
              <div className="w-full flex flex-col gap-y-2">
                <Skeleton className="w-4/5 h-5 rounded-lg" />
                <Skeleton className="w-4/5 h-5 rounded-lg" />
              </div>
              <Skeleton className="w-20 h-10 rounded-sm" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}