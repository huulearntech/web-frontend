import HotelManagerDashboardBookingsPage, { mockBookings } from "./bookings/page";
import HotelManagerStatisticsPage from "./statistics/page";

/* ---------- Main Page Component ---------- */
export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hotel Manager Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage bookings, track income, and keep rooms running smoothly.
          </p>
        </div>
      </header>
      <HotelManagerDashboardBookingsPage />
      <HotelManagerStatisticsPage totalIncome={100} incomeByMonth={[['jan', 100]]} bookings={mockBookings} /> 
    </div>
  );
};