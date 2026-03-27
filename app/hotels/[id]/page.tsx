import { Suspense } from "react";
import AvailableRoomsSection from "./section-available-rooms";
import FacilitiesSection from "./section-facilities";
import LocationSection from "./section-location";
import OverviewSection, { OverviewSectionSkeleton } from "./section-overview";
import PolicySection from "./section-policy";
import ReviewSection from "./section-review";

import { fetchHotel } from "@/lib/actions/hotel";
import SearchBar from "@/components/search-bar";
import Navbar from "./navbar";
import { notFound } from "next/navigation";
import { SearchBarImpl } from "@/components/search-bar copy";
import { SearchParams, SearchParamsCodec } from "@/app/search/(root)/tmp";


// TODO: This page is not yet responsive
// TODO: add default value for searchbar: location = hotel name, other specs stay the same as the search result page.
export default async function Page(props: {
  params: Promise<{ id: string }>
  searchParams: Promise<SearchParams>;
}) {
  const { id: hotelId } = await props.params;
  const hotel = await fetchHotel(hotelId);
  const searchParams = await props.searchParams;
  const safeDecodedParams = SearchParamsCodec.safeDecode(searchParams);

  if (!hotel) {
    return notFound();
  }

  if (!safeDecodedParams.success) {
    // TODO: navigate to home or search page with default params instead of 404
    return notFound();
  }

  // TODO: Skeleton for other sections. Hotel instead of hotel.name
  return (
    <>
      <div className="flex flex-col py-3 sticky top-0 shadow-lg bg-white z-20 gap-y-4">
        <SearchBarImpl defaultValues={safeDecodedParams.data} isDesktop className="content" />
        <Navbar />
      </div>
      <main className="flex flex-col gap-y-4 content my-4">
        <Suspense fallback={<OverviewSectionSkeleton />}>
          <OverviewSection hotel={hotel} />
        </Suspense>
        <AvailableRoomsSection hotel={hotel} />
        <LocationSection hotel={hotel} />
        <FacilitiesSection hotel={hotel} />
        <PolicySection hotelName={hotel.name} />
        <ReviewSection hotel={hotel} />
      </main>
    </>
  );
}