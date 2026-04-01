import { Suspense } from "react";
import BookingsTable from "./booking-table";

export default function HotelManagerDashboardBookingsPage() {
  return (
    <div className="p-5 flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <Suspense fallback={<div>Loading bookings...</div>} >
        <BookingsTable />
      </Suspense>
    </div>
  );
}