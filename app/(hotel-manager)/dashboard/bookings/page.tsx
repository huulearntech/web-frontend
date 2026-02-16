import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns, type Booking } from "../columns";
import { DataTable } from "@/components/data-table";

/* ---------- Mock data (replace with real API calls) ---------- */
export const mockBookings: Booking[] = [
  {
    id: "BKG-001",
    guestName: "Alice Johnson",
    room: "Deluxe 101",
    start: "2026-02-05",
    end: "2026-02-08",
    price: 450,
    status: "confirmed",
    createdAt: "2026-01-10",
  },
  {
    id: "BKG-002",
    guestName: "Bob Smith",
    room: "Suite 201",
    start: "2026-02-10",
    end: "2026-02-12",
    price: 600,
    status: "pending",
    createdAt: "2026-01-20",
  },
  {
    id: "BKG-003",
    guestName: "Carol Rivera",
    room: "Standard 03",
    start: "2026-01-20",
    end: "2026-01-22",
    price: 240,
    status: "cancelled",
    createdAt: "2025-12-28",
  },
  {
    id: "BKG-004",
    guestName: "David Lee",
    room: "Suite 202",
    start: "2026-02-15",
    end: "2026-02-18",
    price: 780,
    status: "checked-in",
    createdAt: "2026-02-02",
  },
];

async function fetchBookings(): Promise<Booking[]> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));
  return mockBookings;
}

export default async function HotelManagerDashboardBookingsPage() {
  const data = await fetchBookings();
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-full">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}