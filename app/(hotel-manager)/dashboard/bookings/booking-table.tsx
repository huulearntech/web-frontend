import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { fetchBookingsSerialized } from "@/lib/actions/hotel-manager/bookings";


export default async function BookingsTable() {
  // TODO: auth should be centralized in a middleware, but for now we can just do it here
  const session = await auth();
  if (!session || !session.user) return null;

  const userId = session.user.id;
  const hotel = await prisma.hotel.findUnique({
    where: { ownerId: userId },
    select: { id: true }
  });

  if (!hotel) return null;
  const bookings = await fetchBookingsSerialized(hotel.id);
  return (
    <DataTable
      columns={columns}
      data={bookings}
    />
  );
}