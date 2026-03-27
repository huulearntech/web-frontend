import { notFound } from "next/navigation";

import Filter from "../filter";
import Results from "./results";

import FilterSheetProvider from "../filter-sheet-context";
import SearchBar, { SearchBarImpl } from "@/components/search-bar";

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
        <SearchBarImpl
          defaultValues={safeDecodedParams.data}
          isDesktop
          className="content"
        />
      </div>
      <main className="flex gap-x-6 content my-6">
        <FilterSheetProvider>
          <Filter />
          {/** TODO: Maybe compose search status bar with results to use one db query? */}
          <Results location={location} />
        </FilterSheetProvider>
      </main>
    </>
  )
}