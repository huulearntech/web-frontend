import { notFound } from "next/navigation";
import { Suspense } from "react";

import Filter from "./filter";
import Results, { ResultsSkeleton } from "./results";

import type { SearchPageProps } from "@/lib/definitions";

import FilterSheetProvider from "./filter-sheet-context";
import SearchStatusBar, { SearchStatusBarSkeleton } from "./search-status-bar";

// Should somehow get the filter and the status bar out
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
      <FilterSheetProvider>
        <Filter />

        <div className="w-full flex flex-col space-y-3">
          <Suspense fallback={<SearchStatusBarSkeleton />}>
            <SearchStatusBar />
          </Suspense>

          <Suspense fallback={<ResultsSkeleton />}>
            <Results />
          </Suspense>
        </div>
      </FilterSheetProvider>
    </>
  )
}