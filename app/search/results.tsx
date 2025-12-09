import { notFound } from "next/navigation";

import { HotelCardSimple } from "@/components/hotel-card";
import type { HotelCardProps } from "@/old/mock_data";
import type { SearchPageProps } from "@/lib/definitions"

export default async function Results({ searchParams } : {
  searchParams: SearchPageProps
}) {
  const { spec, childSpec } = await searchParams;
  if (!spec) notFound();
  const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  const childAges = childSpec?.split('.'); // age of every child

  /**
   * Server-side data fetching
   */
  const results : HotelCardProps[] = [];

  return (
    <ul>
      {results.map((hotel, index) => (
        <li key={index}>
          <HotelCardSimple hotel={hotel} />
        </li>
      ))}
    </ul>
  )
};