import { Suspense } from "react";
import BookingsTable from "./booking-table";

import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export default function HotelManagerDashboardBookingsPage() {
  return (
    <div className="p-5 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings</h1>
            <ToggleGroup
              type="single"
              variant="outline"
              orientation="vertical" // Why does orientation not work?
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
            />
          </DropdownMenuContent>
        </DropdownMenu>


      </div>
      <Suspense fallback={<div>Loading bookings...</div>} >
        <BookingsTable />
      </Suspense>
    </div>
  );
}