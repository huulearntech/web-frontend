import { Suspense } from "react";
import AvailableRoomsSection from "./section-available-rooms";
import FacilitiesSection from "./section-facilities";
import LocationSection from "./section-location";
import OverviewSection, { OverviewSectionSkeleton} from "./section-overview";
import PolicySection from "./section-policy";
import ReviewSection from "./section-review";

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
      <FacilitiesSection />
      <PolicySection />
      <ReviewSection />
    </>
  );
}