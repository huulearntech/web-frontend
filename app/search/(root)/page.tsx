import { notFound } from "next/navigation";

import Filter from "../filter";
import Results from "./results";

import FilterSheetProvider from "../filter-sheet-context";
import SearchBar from "@/components/search-bar";

import { SearchParams, SearchParamsCodec } from "./tmp";

export default async function SearchPage( props: { searchParams: Promise<SearchParams>}) {
  const searchParams = await props.searchParams;
  const safeDecodedParams = SearchParamsCodec.safeDecode(searchParams);
 // TODO: navigate to home or search page with default params instead of 404
  if (!safeDecodedParams.success) return notFound();
  const { location } = safeDecodedParams.data;

  return (
    <>
      <div className="py-3 sticky top-0 shadow-lg bg-white z-20 flex justify-center">
        <SearchBar defaultValues={safeDecodedParams.data} />
      </div>
      <main className="flex gap-x-6 content my-6">
        <FilterSheetProvider>
          <Filter />
          <Results location={location} />
        </FilterSheetProvider>
      </main>
    </>
  )
}