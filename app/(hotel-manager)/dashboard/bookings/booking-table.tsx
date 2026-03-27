import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { fetchBookingsSerialized } from "@/lib/actions/hotel-manager/bookings";

export default async function BookingsTable() {
  // TODO: auth should be centralized in a middleware, but for now we can just do it here
  const bookings = await fetchBookingsSerialized();

  // TODO: Control the date range.

  return (
    <DataTable columns={columns} data={bookings} />
  );
}