import { notFound } from "next/navigation";

import Filter from "../filter";
import Results from "./results";

import FilterSheetProvider from "../filter-sheet-context";
import SearchBar from "@/components/search-bar";
import { SearchBarFormData } from "@/lib/zod_schemas/search-bar";
import { SearchParams } from './tmp'

export default async function SearchPage(props: { searchParams: Promise<SearchParams> }) {
  const {
    location = "",
    fromDate,
    toDate,
    numAdults = "2",
    numChildren = "0",
    numRooms = "1",
  } = await props.searchParams;

  // normalize location to a single string and render 404 if empty
  if (location.length === 0) notFound();

  const reconstructedSearchBarFormData: SearchBarFormData = {
    location,
    inOutDates: {
      from: new Date(fromDate),
      to: new Date(toDate),
    },
    guestsAndRooms: {
      numAdults: parseInt(numAdults, 10) || 2,
      numChildren: parseInt(numChildren, 10) || 0,
      numRooms: parseInt(numRooms, 10) || 1,
    }
  };

  return (
    <>
      <div className="py-3 sticky top-0 shadow-lg bg-white z-20 flex justify-center">
        <SearchBar defaultValues={reconstructedSearchBarFormData} />
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