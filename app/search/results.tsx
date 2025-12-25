// If handle infinit scroll -> client component. If pagination -> server component
import { notFound } from "next/navigation";

import { HotelCard } from "@/components/hotel-card";
import type { HotelCardProps } from "@/old/mock_data";
import type { SearchPageProps } from "@/lib/definitions"

import { fake_hotels } from "@/old/mock_data";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default async function Results( props: { 
  searchParams?: Promise<SearchPageProps>
}) {
  // if (!props.searchParams) notFound();
  // const { spec, childSpec } = await props.searchParams;
  // if (!spec) notFound();

  // const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  // const childAges = childSpec?.split('.'); // age of each child

  /**
   * Server-side data fetching
   */
  const results : HotelCardProps[] = fake_hotels.concat(fake_hotels).concat(fake_hotels);
  const currentPage = 9;
  const totalPages = 10;

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
            <PaginationPrevious />
          </PaginationItem>
          {
            totalPages <= 5 ?
              (
                Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))
              ) : (
                <>
                  {
                    currentPage > 1 &&
                    <PaginationItem>
                      <PaginationLink>1</PaginationLink>
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
                      <PaginationLink>{currentPage - 1}</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    <PaginationItem>
                      <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                  }
                  {
                    currentPage <= totalPages - 2 &&
                    <PaginationItem>
                      <PaginationLink>{currentPage + 1}</PaginationLink>
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
                      <PaginationLink>{totalPages}</PaginationLink>
                    </PaginationItem>
                  }
                </>
              )
          }
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
};