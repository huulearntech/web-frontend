import { Suspense } from "react";
import AvailableRoomsSection from "./section-available-rooms";
import FacilitiesSection from "./section-facilities";
import LocationSection from "./section-location";
import OverviewSection, { OverviewSectionSkeleton} from "./section-overview";
import PolicySection from "./section-policy";
import ReviewSection from "./section-review";

import { fake_facility_categories } from "./section-facilities";

// TODO: This page is not yet responsive
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // const hotel = getHotelFromId(id);

  return (
    <>
      <Suspense fallback={<OverviewSectionSkeleton />}>
        <OverviewSection />
      </Suspense>
      <AvailableRoomsSection />
      <LocationSection />
      <FacilitiesSection facilities={fake_facility_categories} hotelName="bla bla bla hotel"/>
      <PolicySection />
      <ReviewSection />
    </>
  );
}