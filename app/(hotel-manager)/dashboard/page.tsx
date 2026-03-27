import {
  TaskList,
  RoomStatusBoard,
} from "./dashboardComponents";

import { UpcomingBooking } from "./tmp-components/upcoming-booking";

import { ChartAreaInteractive as RevenueChart } from "./tmp-components/chart-area-interactive";
import DashboardMetricCards from "./section-metric-cards";

export default function DashboardPage() {
  return (
    <main>
      <DashboardMetricCards />

      <section className="flex flex-col gap-y-4" >
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <h2>Upcoming Bookings</h2>
          <UpcomingBooking />
        </div>

        <RevenueChart />

        {/** May show occupancy? How? */}

        <div className="bg-white p-3 rounded-lg shadow-sm">
          <h2>Tasks</h2>
          <TaskList />
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm">
          <h2>Room Status</h2>
          <RoomStatusBoard />
        </div>
      </section>
    </main>
  );
}