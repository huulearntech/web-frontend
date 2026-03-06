import { notFound } from "next/navigation";
import { Suspense } from "react";

import Filter from "../filter";
import Results, { ResultsSkeleton } from "./results";

import FilterSheetProvider from "../filter-sheet-context";
import SearchStatusBar from "./search-status-bar";

import { SearchPage__SearchParamsCodec } from "./tmp";

// Should somehow get the filter and the status bar out
// TODO: Learn why the search params be Record<string, string> instead of URLSearchParams, and if we can change it to URLSearchParams
export default async function SearchPage( props: { searchParams: Promise<Record<string, string>>}) {
  const safeDecodedParams = SearchPage__SearchParamsCodec.safeDecode(new URLSearchParams(await props.searchParams));
  if (!safeDecodedParams.success) return notFound(); // TODO: navigate to home or search page with default params instead of 404, since the user may have manually edited the search params to be invalid, and 404 is not a good UX in this case
  const {location, inOutDates, guestsAndRooms} = safeDecodedParams.data;

  return (
    <FilterSheetProvider>
      <Filter />

      <div className="w-full flex flex-col space-y-3">
        <SearchStatusBar location={location} />

        <Suspense fallback={<ResultsSkeleton />}>
          <Results />
        </Suspense>
      </div>
    </FilterSheetProvider>
  )
}