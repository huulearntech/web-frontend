import { Suspense } from "react";
import AvailableRoomsSection from "./section-available-rooms";
import FacilitiesSection from "./section-facilities";
import LocationSection from "./section-location";
import OverviewSection, { OverviewSectionSkeleton } from "./section-overview";
import PolicySection from "./section-policy";
import ReviewSection from "./section-review";

import { fetchHotel } from "@/lib/actions/hotel";

// TODO: This page is not yet responsive
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: hotelId } = await params;
  const hotel = await fetchHotel(hotelId);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <>
      <Suspense fallback={<OverviewSectionSkeleton />}>
        <OverviewSection hotel={hotel}/>
      </Suspense>
      <AvailableRoomsSection hotel={hotel}/>
      <LocationSection hotelName={hotel.name} />
      <FacilitiesSection hotel={hotel}/>
      <PolicySection hotelName={hotel.name} />
      <ReviewSection hotelName={hotel.name} />
    </>
  );
}