import { notFound } from "next/navigation";
import Filter from "./filter";
import Results from "./results";

import type { SearchPageProps } from "@/lib/definitions";
import { Suspense } from "react";

export default async function SearchPage( props: { 
  searchParams?: Promise<SearchPageProps>
}) {
  const searchParams = await props.searchParams;
  const { spec, childSpec } = searchParams;
  if (!spec) notFound();
  const [location, inOutDate, numAdults, numRooms] = spec.split('.');
  const childAges = childSpec?.split('.'); // age of every child

  return (
    <main className="flex">
      <Filter />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex flex-col text-sm">
            <span className="font-semibold"> {location} </span>
            <span> {/**  number of results found*/} 10000 noi luu tru duoc tim thay </span>
          </div>
          <div>
            <label htmlFor="sort-by" className="text-sm"> Sort by </label>
            <select id="sort-by">
              <option>a</option>
              <option>b</option>
              <option>c</option>
              <option>d</option>
            </select>
          </div>
        </div>
        <Suspense fallback={<div>loading</div>}>
          <Results searchParams={searchParams}/>

        </Suspense>
        {/** search results */}
      </div>
    </main>
  )
}