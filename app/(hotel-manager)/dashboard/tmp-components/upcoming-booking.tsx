import { DataTable } from "@/components/data-table";
import { columns } from "../bookings/columns";
import { fetchUpcomingBookings } from "@/lib/actions/hotel-manager/bookings";

export async function UpcomingBooking() {
  const upcomingBookings = await fetchUpcomingBookings();
  return (
    <DataTable columns={columns} data={upcomingBookings} />
  );
}


