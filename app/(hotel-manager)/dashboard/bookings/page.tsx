import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BookingsTable from "./booking-table";
import { Suspense } from "react";

export default function HotelManagerDashboardBookingsPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-full">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="overflow-x-auto">
              <BookingsTable />
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}