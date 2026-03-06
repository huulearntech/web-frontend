import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

import MiniBarChart from "./chart";

export default async function HotelManagerStatisticsPage() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  const hotel = await prisma.hotel.findUnique({
    where: { ownerId: session.user.id },
    select: { id: true }
  });

  if (!hotel) {
    // TODO: redirect to normal user page
    return <div className="p-4">No hotel found for this manager.</div>;
  }

  const bookings = await prisma.booking.findMany({
    where: { hotelId: hotel.id },
    select: {
      id: true,
      status: true,
      totalPrice: true,
      createdAt: true,
    },
  });

  // FIXME: using toNumber on Decimal may causes precision loss, but just demo for now
  const totalIncome = bookings.reduce((sum, b) => sum + b.totalPrice.toNumber(), 0);
  const incomeByMonth = bookings.reduce((acc, b) => {
    const month = b.createdAt.toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + b.totalPrice.toNumber();
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Income Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Last months</div>
              <div className="text-2xl font-semibold">{totalIncome}</div>
            </div>
            {/* <div className="flex gap-2">
              <Button onClick={() => alert("Load more (stub)")}>Last 12 months</Button>
            </div> */}
          </div>

          <MiniBarChart data={Object.entries(incomeByMonth).map(([name, value]: [string, number]) => ({ name, value }))} />

          <div className="mt-4 grid grid-cols-2 gap-4">
            {Object.entries(incomeByMonth).map(([name, value]: [string, number]) => (
              <div key={name} className="p-3 border rounded">
                <div className="text-xs text-muted-foreground">{name}</div>
                <div className="text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Total Income</div>
              <div className="font-medium">{totalIncome}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Bookings</div>
              <div className="font-medium">{bookings.length}</div>
            </div>

            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Confirmed</div>
              <div className="font-medium">
                {bookings.filter((b) => b.status === "CONFIRMED").length}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="font-medium">
                {bookings.filter((b) => b.status === "PENDING").length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}