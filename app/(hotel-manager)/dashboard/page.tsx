import {
  TaskList,
  RoomStatusBoard,
} from "./dashboardComponents";

import UpcomingBooking, { UpcomingBookingSkeleton } from "./tmp-components/upcoming-booking";

import { ChartAreaInteractive as RevenueChart } from "./tmp-components/chart-area-interactive";
import DashboardMetricCards from "./section-metric-cards";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main>
      <DashboardMetricCards />

      <section className="flex flex-col gap-y-4" >

        <RevenueChart />

        <div className="flex flex-col gap-y-4">
          <h2>Upcoming Bookings</h2>
          <Suspense fallback={<UpcomingBookingSkeleton />} >
            <UpcomingBooking />
          </Suspense>
        </div>

        {/** May show occupancy? How? */}
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <h2>Room Status</h2>
          <RoomStatusBoard />
        </div>
      </section>
    </main>
  );
}