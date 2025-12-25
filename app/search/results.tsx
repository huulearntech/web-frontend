// If handle infinit scroll -> client component. If pagination -> server component
import { notFound } from "next/navigation";

import { HotelCard } from "@/components/hotel-card";
import type { HotelCardProps } from "@/old/mock_data";
import type { SearchPageProps } from "@/lib/definitions"

export default async function Results( props: { 
  searchParams?: Promise<SearchPageProps>
}) {
  if (!props.searchParams) notFound();
  const { spec, childSpec } = await props.searchParams;
  if (!spec) notFound();

  const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  const childAges = childSpec?.split('.'); // age of each child

  /**
   * Server-side data fetching
   */
  const results : HotelCardProps[] = [];

  return (
    <ul>
      {results.map((hotel, index) => (
        <li key={index}>
          <HotelCard hotel={hotel} />
        </li>
      ))}
    </ul>
  )
};