"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { hotelowner_getBookings } from "@/lib/actions/hotel-manager/bookings";

import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { DateRange } from "react-day-picker";


// TODO: Control the date range.
export default function BookingsTable() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000), // Default to a range of 1 day
    to: new Date(),
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hotelowner_bookings"],
    queryFn: async () => {
      return hotelowner_getBookings();
    },
  });

  const bookings = data?.bookings ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bookings.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <ToggleGroup
          type="single"
          variant="outline"
        >
          <ToggleGroupItem value="last7" className="data-[state=on]:bg-primary data-[state=on]:text-white">
            Last 7 days
          </ToggleGroupItem>
          <ToggleGroupItem value="last30" className="data-[state=on]:bg-primary data-[state=on]:text-white">
            Last 30 days
          </ToggleGroupItem>
        </ToggleGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Select date range
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={dateRange}
              onSelect={setDateRange}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable columns={columns} data={bookings} />
    </div>
  );
}