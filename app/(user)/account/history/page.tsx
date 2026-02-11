import Link from "next/link";
import { headers } from "next/headers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/auth";

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

type Booking = {
  id: string;
  hotelName: string;
  roomType: string;
  startDate: string; // ISO
  endDate: string; // ISO
  guests: number;
  price: number; // in cents
  currency?: string;
  status: BookingStatus;
  createdAt: string;
};

async function fetchBookings(query?: string, status?: string): Promise<Booking[]> {
  // Send cookies from the incoming request so the API route can authenticate the user.
  // The API route (/api/bookings) should return bookings for the authenticated user.
  const cookie = (await headers()).get("cookie") || "";

  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (status) params.set("status", status);

  // Relative fetch to internal Next.js API route; include cookies for auth.
  const res = await fetch(`/api/bookings?${params.toString()}`, {
    headers: { cookie },
    // no-store ensures the page always shows user's latest data
    cache: "no-store",
  });

  if (!res.ok) {
    // If your API returns 401 for unauthenticated, handle upstream via session check.
    console.error("Failed to load bookings", await res.text());
    return [];
  }

  const data = (await res.json()) as Booking[];
  return data;
}

function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    cents / 100
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, { text: string; variant: string }> = {
    pending: { text: "Pending", variant: "bg-yellow-100 text-yellow-800" },
    confirmed: { text: "Confirmed", variant: "bg-green-100 text-green-800" },
    completed: { text: "Completed", variant: "bg-sky-100 text-sky-800" },
    cancelled: { text: "Cancelled", variant: "bg-red-100 text-red-800" },
  };
  const s = map[status];
  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${s.variant}`}>{s.text}</span>;
}

export default async function AccountHistoryPage({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string };
}) {
  const session = await auth();
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <Card>
          <CardHeader>
            <CardTitle>Booking history</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You must be signed in to view your booking history.</p>
            <Link href="/api/auth/signin" className="no-underline">
              <Button>Sign in</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const q = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const status = typeof searchParams?.status === "string" ? searchParams.status : undefined;

  const bookings = await fetchBookings(q, status);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Booking history</h1>
          <p className="text-sm text-muted-foreground">
            All your past and upcoming bookings. Use the search to filter by hotel or booking id.
          </p>
        </div>

        <form method="get" className="flex gap-2 items-center">
          <Input
            name="q"
            placeholder="Search by booking id or hotel..."
            defaultValue={q ?? ""}
            className="min-w-65"
          />
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-md border px-3 py-2 bg-white"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your bookings</span>
            <span className="text-sm text-muted-foreground">{bookings.length} result(s)</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {bookings.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No bookings found. Try clearing filters or make a booking.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Guests / Room</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="text-sm font-medium">{b.id}</div>
                      <div className="text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{b.hotelName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {b.guests} guest{b.guests > 1 ? "s" : ""} • {b.roomType}
                      </div>
                    </TableCell>
                    <TableCell>{formatMoney(b.price, b.currency ?? "USD")}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/account/bookings/${b.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        {b.status === "confirmed" && (
                          <form
                            method="post"
                            action={`/api/bookings/${b.id}/cancel`}
                            // You might include a CSRF token or other auth protections in your API
                          >
                            <Button type="submit" size="sm" variant="destructive">
                              Cancel
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}