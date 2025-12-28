import AvailableRoomsSection from "./section-available-rooms";
import OverviewSection from "./section-overview";

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
    </>
  );
}