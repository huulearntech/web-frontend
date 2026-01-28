import AvailableRoomsSection from "./section-available-rooms";
import FacilitiesSection from "./section-facilities";
import LocationSection from "./section-location";
import OverviewSection from "./section-overview";
import PolicySection from "./section-policy";
import ReviewSection from "./section-review";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // const hotel = getHotelFromId(id);

  return (
    <>
      <OverviewSection />
      <AvailableRoomsSection />
      <LocationSection />
      <FacilitiesSection />
      <PolicySection />
      <ReviewSection />
    </>
  );
}