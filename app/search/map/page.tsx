"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

import FilterSheetProvider, { useFilterSheetSetOpen } from "../filter-sheet-context";
import { FilterFormProvider } from "../filter-form-context";
import { FilterSheet } from "../filter";
import SearchBar from "@/components/search-bar copy";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { SearchBarFormData, formSchema as SearchBarFormSchema } from "@/lib/zod_schemas/search-bar";

// Need to dynamically import the map component because it relies on Leaflet which uses browser-specific APIs
// that are not available during server-side rendering.
// By setting ssr: false, we ensure that the MapClient component is only rendered on the client side,
// preventing any SSR-related issues.
const MapClient = dynamic(() => import("./map-client"), { ssr: false });

export default function SearchMapPage() {
  const searchParams = useSearchParams();

  // TODO: handle error.
  const searchBarValuesFromSearchParams = {
    location: searchParams.get("location") || "",
    inOutDates: {
      from: new Date(searchParams.get("checkInDate")!),
      to: new Date(searchParams.get("checkOutDate")!),
    },
    guestsAndRooms: {
      numAdults: searchParams.get("numAdults") ? parseInt(searchParams.get("numAdults")!) : 1,
      numChildren: searchParams.get("numChildren") ? parseInt(searchParams.get("numChildren")!) : 0,
      numRooms: searchParams.get("numRooms") ? parseInt(searchParams.get("numRooms")!) : 1,
    },
  } satisfies SearchBarFormData;

  const { success, data: defaultSearchBarValues } = SearchBarFormSchema.safeParse(searchBarValuesFromSearchParams);
  if (!success) {
    return null;
    // TODO: handle this case properly, maybe redirect back to search page with a toast notification?
  }
  return (
    <FilterFormProvider>
      <FilterSheetProvider>
        <div className="w-screen h-screen flex flex-col">
          <SearchBarWithFilterTrigger defaultValues={defaultSearchBarValues} />
          <MapClient />
        </div>
        <FilterSheet data-responsive={false}/>
      </FilterSheetProvider>
    </FilterFormProvider>
  );
}

// FIXME: This make one more layer of wrapper so somehow the SearchBarImpl
// get fucked and say: "Nope, I won't receive the defaultValues if you don't use directly"
function SearchBarWithFilterTrigger({ defaultValues }: { defaultValues: SearchBarFormData }) {
  const setFilterSheetOpen = useFilterSheetSetOpen();

  return (
    <div className="py-3 top-0 shadow-lg bg-white z-500 flex items-end justify-center gap-x-2">
      <Button
        onClick={() => setFilterSheetOpen(true)}
        variant="outline"
        className="size-9 flex items-center justify-center"
        aria-label="Open filter sheet"
      >
        <ListFilter className="size-4" />
      </Button>
      <SearchBar defaultValues={defaultValues} className="content mx-0 z-1000" />
    </div>
  )
};